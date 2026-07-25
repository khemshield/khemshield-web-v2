"use server";

import Joi from "joi";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { toFieldErrors, type FieldErrors } from "@/app/lib/formErrors";
import connectDB from "@/app/lib/db/connect";
import {
  hashIp,
  submitReview,
  TestimonialRelationship,
} from "@/app/lib/reviews/review.service";
import {
  isTestimonialPhotoPublicId,
  isTestimonialPhotoUrl,
} from "@/app/lib/cloudinary";

export type ReviewState = { message: string; errors?: FieldErrors };

/** Why a link stopped working, phrased for the person holding it. */
const INVITE_PROBLEMS: Record<string, string> = {
  not_found: "This review link isn't valid. Please check the link you were sent.",
  expired:
    "This review link has expired. Get in touch and we'll send you a fresh one.",
  revoked: "This review link is no longer active.",
  submitted:
    "A review has already been submitted with this link. Thank you again!",
  consent_required:
    "Please tick the permission box so we know we may publish your review.",
};

const schema = Joi.object({
  token: Joi.string().trim().required(),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "any.required": "Please choose a star rating",
    "number.base": "Please choose a star rating",
  }),
  body: Joi.string().trim().min(40).max(1000).required().messages({
    "string.min":
      "Please write at least 40 characters so the review is useful to others",
    "string.max": "Please keep your review under 1000 characters",
    "string.empty": "Please write your review",
  }),
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Please enter your full name",
  }),
  role: Joi.string().trim().min(2).required().messages({
    "string.empty": "Please enter your role or job title",
  }),
  company: Joi.string().trim().allow("").max(120).optional(),
  headline: Joi.string().trim().allow("").max(80).optional(),
  relationship: Joi.string()
    .valid(...Object.values(TestimonialRelationship), "")
    .optional(),
  engagement: Joi.string().trim().allow("").max(120).optional(),
  photoUrl: Joi.string().trim().allow("").optional(),
  photoPublicId: Joi.string().trim().allow("").optional(),
  consent: Joi.boolean().valid(true).required().messages({
    "any.only":
      "Please tick the permission box so we know we may publish your review",
    "any.required":
      "Please tick the permission box so we know we may publish your review",
  }),
});

/**
 * Record a client's review against their invite token.
 *
 * Validation errors come back as a per-field map and are rendered inline on the
 * form, matching the convention in app/lib/formErrors.ts. Only failures that
 * aren't about a specific field (a dead link, a database problem) use the
 * form-level `message`.
 */
export const submitReviewAction = async (
  _prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> => {
  const { value, error } = schema.validate(
    {
      token: formData.get("token"),
      rating: formData.get("rating"),
      body: formData.get("body"),
      name: formData.get("name"),
      role: formData.get("role"),
      company: formData.get("company"),
      headline: formData.get("headline"),
      relationship: formData.get("relationship"),
      engagement: formData.get("engagement"),
      photoUrl: formData.get("photoUrl"),
      photoPublicId: formData.get("photoPublicId"),
      // An unchecked checkbox is absent from FormData rather than "off", so
      // normalise to a boolean before validating.
      consent: formData.get("consent") === "on",
    },
    { abortEarly: false }
  );

  if (error) {
    return { message: "", errors: toFieldErrors(error) };
  }

  // The photo fields are only ever written by our own upload component, so a
  // value that doesn't look like one of our Cloudinary assets means the form was
  // tampered with. Reject rather than quietly dropping it.
  const hasPhoto = Boolean(value.photoUrl || value.photoPublicId);
  if (hasPhoto) {
    const looksRight =
      isTestimonialPhotoUrl(value.photoUrl) &&
      isTestimonialPhotoPublicId(value.photoPublicId);

    if (!looksRight) {
      return {
        message: "",
        errors: {
          photoUrl:
            "We couldn't verify that photo. Please remove it and upload again.",
        },
      };
    }
  }

  let submitterIpHash: string | undefined;
  const salt = process.env.REVIEW_IP_SALT;
  if (salt) {
    const forwarded = headers().get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim();
    if (ip) submitterIpHash = hashIp(ip, salt);
  }

  try {
    await connectDB();

    const result = await submitReview({
      token: value.token,
      rating: value.rating,
      body: value.body,
      name: value.name,
      role: value.role,
      company: value.company,
      headline: value.headline,
      relationship: value.relationship || undefined,
      engagement: value.engagement,
      photoUrl: value.photoUrl,
      photoPublicId: value.photoPublicId,
      consentAgreed: value.consent,
      submitterIpHash,
    });

    if (!result.ok) {
      return {
        message:
          INVITE_PROBLEMS[result.reason] ??
          "We couldn't record your review. Please try again.",
      };
    }
  } catch (err) {
    console.error("[reviews] submission failed:", err);
    return {
      message:
        "We couldn't save your review just now. Please try again in a moment.",
    };
  }

  // Outside the try block: redirect() signals by throwing, so catching it here
  // would swallow the navigation. The invite is now marked submitted, so the
  // page renders its thank-you state.
  redirect(`/review/${value.token}?submitted=1`);
};
