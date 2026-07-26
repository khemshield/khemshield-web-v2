"use server";

import Joi from "joi";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import connectDB from "@/app/lib/db/connect";
import { toFieldErrors, type FieldErrors } from "@/app/lib/formErrors";
import { sendResendEmail } from "@/app/lib/email/sendResendEmail";
import {
  reviewInviteHtml,
  reviewInviteSubject,
} from "@/app/lib/email/reviewInviteEmail";
import {
  DEFAULT_INVITE_DAYS,
  createInvite,
  deleteInvite,
  deleteTestimonial,
  moveTestimonial,
  revokeInvite,
  setTestimonialStatus,
  TestimonialStatus,
} from "@/app/lib/reviews/review.service";
import { destroyTestimonialPhoto } from "@/app/lib/cloudinary.server";

export type EmailOutcome =
  /** No address was given, so nothing was sent. */
  | { status: "skipped" }
  | { status: "sent"; to: string }
  | { status: "failed"; to: string; error: string };

export type InviteFormState = {
  message: string;
  /** Full review URL to hand to the client, present on success. */
  link?: string;
  clientName?: string;
  /**
   * Reported separately from `link` on purpose. The invite is already saved by
   * the time the send is attempted, so a bounce must not read as a failure to
   * create the invite, and must not hide the link.
   */
  email?: EmailOutcome;
  errors?: FieldErrors;
};

const inviteSchema = Joi.object({
  clientName: Joi.string().trim().min(2).required().messages({
    "string.empty": "Enter the client's name",
    "string.min": "Enter the client's name",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow("")
    .optional()
    .messages({ "string.email": "That doesn't look like a valid email" }),
  note: Joi.string().trim().allow("").max(300).optional(),
  expiresInDays: Joi.number().integer().min(1).max(90).required(),
});

/** Origin of the current request, used to build the shareable review URL. */
const requestOrigin = (): string => {
  const store = headers();
  const host = store.get("host") ?? "localhost:3000";
  const proto =
    store.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
};

export const createInviteAction = async (
  _prevState: InviteFormState,
  formData: FormData
): Promise<InviteFormState> => {
  const { value, error } = inviteSchema.validate(
    {
      clientName: formData.get("clientName"),
      email: formData.get("email"),
      note: formData.get("note"),
      expiresInDays: formData.get("expiresInDays") || DEFAULT_INVITE_DAYS,
    },
    { abortEarly: false }
  );

  if (error) {
    return { message: "", errors: toFieldErrors(error) };
  }

  try {
    await connectDB();

    const invite = await createInvite({
      clientName: value.clientName,
      email: value.email || undefined,
      note: value.note || undefined,
      expiresInDays: value.expiresInDays,
    });

    const link = `${requestOrigin()}/review/${invite.token}`;

    // Send after the invite exists, and never let a send failure bubble up as a
    // creation failure. The link is returned either way so it can still be sent
    // by hand.
    let email: EmailOutcome = { status: "skipped" };

    if (invite.email) {
      const result = await sendResendEmail({
        to: invite.email,
        // Replies reach the team inbox rather than the unroutable send domain.
        replyTo: process.env.RESEND_REPLY_TO,
        subject: reviewInviteSubject,
        html: reviewInviteHtml({
          clientName: invite.clientName,
          link,
          expiresAt: new Date(invite.expiresAt),
        }),
      });

      email = result.ok
        ? { status: "sent", to: invite.email }
        : { status: "failed", to: invite.email, error: result.error };
    }

    revalidatePath("/studio/reviews");

    return {
      message: "ok",
      link,
      clientName: invite.clientName,
      email,
    };
  } catch (err) {
    console.error("[studio] creating invite failed:", err);
    return { message: "Could not create the invite. Please try again." };
  }
};

const statusSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  status: Joi.string()
    .valid(...Object.values(TestimonialStatus))
    .required(),
});

export const setStatusAction = async (formData: FormData): Promise<void> => {
  const { value, error } = statusSchema.validate({
    id: formData.get("id"),
    status: formData.get("status"),
  });

  if (error) {
    console.error("[studio] rejected status change:", error.message);
    return;
  }

  try {
    await connectDB();
    await setTestimonialStatus(value.id, value.status);

    // The homepage is ISR, so it keeps serving the old testimonial list until
    // its path is invalidated. Without this an approval wouldn't show up until
    // the revalidate window elapsed.
    revalidatePath("/");
    revalidatePath("/studio/reviews");
  } catch (err) {
    console.error("[studio] status change failed:", err);
  }
};

const moveSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  direction: Joi.string().valid("up", "down").required(),
});

/** Reorder a published testimonial. Non-destructive, so no confirmation. */
export const moveTestimonialAction = async (
  formData: FormData
): Promise<void> => {
  const { value, error } = moveSchema.validate({
    id: formData.get("id"),
    direction: formData.get("direction"),
  });

  if (error) {
    console.error("[studio] rejected reorder:", error.message);
    return;
  }

  try {
    await connectDB();
    await moveTestimonial(value.id, value.direction);

    // Order decides which testimonials lead on the homepage, so it has to be
    // invalidated alongside the studio list.
    revalidatePath("/");
    revalidatePath("/studio/reviews");
  } catch (err) {
    console.error("[studio] reorder failed:", err);
  }
};

const idOnlySchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

/**
 * Permanently delete a testimonial and its photo.
 *
 * The database record goes first, then the Cloudinary asset. If the asset
 * removal fails the record is still gone, so the failure is logged loudly rather
 * than retried: an orphaned CDN file is a cleanup problem, whereas leaving the
 * review on the site after a takedown request is a real one.
 */
export const deleteTestimonialAction = async (
  formData: FormData
): Promise<void> => {
  const { value, error } = idOnlySchema.validate({ id: formData.get("id") });

  if (error) {
    console.error("[studio] rejected testimonial delete:", error.message);
    return;
  }

  try {
    await connectDB();
    const { deleted, photoPublicId } = await deleteTestimonial(value.id);

    if (deleted && photoPublicId) {
      const result = await destroyTestimonialPhoto(photoPublicId);
      if (!result.ok) {
        console.error(
          `[studio] testimonial ${value.id} deleted but its Cloudinary photo ${photoPublicId} was not removed: ${result.error}`
        );
      }
    }

    revalidatePath("/");
    revalidatePath("/studio/reviews");
  } catch (err) {
    console.error("[studio] testimonial delete failed:", err);
  }
};

/** Permanently delete an invite. Leaves any review it produced untouched. */
export const deleteInviteAction = async (formData: FormData): Promise<void> => {
  const { value, error } = idOnlySchema.validate({ id: formData.get("id") });

  if (error) {
    console.error("[studio] rejected invite delete:", error.message);
    return;
  }

  try {
    await connectDB();
    await deleteInvite(value.id);
    revalidatePath("/studio/reviews");
  } catch (err) {
    console.error("[studio] invite delete failed:", err);
  }
};

export const revokeInviteAction = async (formData: FormData): Promise<void> => {
  const id = String(formData.get("id") ?? "");
  if (!/^[a-f\d]{24}$/i.test(id)) return;

  try {
    await connectDB();
    await revokeInvite(id);
    revalidatePath("/studio/reviews");
  } catch (err) {
    console.error("[studio] revoking invite failed:", err);
  }
};
