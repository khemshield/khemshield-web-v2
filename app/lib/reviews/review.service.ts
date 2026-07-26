import { randomBytes, createHash } from "node:crypto";
import { type Types } from "mongoose";

import Testimonial, {
  TestimonialRelationship,
  TestimonialSource,
  TestimonialStatus,
  type ITestimonialAuthor,
  type ITestimonialConsent,
} from "./testimonial.model";
import ReviewInvite, { ReviewInviteStatus } from "./reviewInvite.model";
import { CONSENT_TEXT, CONSENT_VERSION } from "./consent";

/**
 * All review/testimonial database logic.
 *
 * PORTABLE: this module imports nothing from `next/*`. Keep it that way. It is
 * meant to move to `backend/app/modules/testimonial/testimonial.service.ts`
 * once the Render backend is back, at which point the backend adds its own
 * controller/resolver on top and this copy is deleted along with app/(studio)
 * and app/api/reviews.
 *
 * Anything Next-specific (reading request headers, revalidatePath, cookies)
 * belongs in the caller, not here.
 */

// ---------------------------------------------------------------------------
// Plain-object shapes
//
// Server components pass these across the RSC boundary, so no Mongoose
// documents and no Date objects leak out: ids are strings, dates are ISO.
// ---------------------------------------------------------------------------

export type PublicTestimonial = {
  id: string;
  rating: number;
  headline?: string;
  body: string;
  author: ITestimonialAuthor;
  relationship?: TestimonialRelationship;
  engagement?: string;
  publishedAt?: string;
};

export type AdminTestimonial = PublicTestimonial & {
  status: TestimonialStatus;
  source: TestimonialSource;
  email?: string;
  order: number;
  consent: { agreed: boolean; at: string; version: string; text: string };
  createdAt?: string;
};

export type AdminInvite = {
  id: string;
  token: string;
  clientName: string;
  email?: string;
  note?: string;
  status: ReviewInviteStatus;
  expiresAt: string;
  isExpired: boolean;
  submittedAt?: string;
  createdAt?: string;
};

type LeanTestimonial = {
  _id: Types.ObjectId;
  rating: number;
  headline?: string;
  body: string;
  author: ITestimonialAuthor;
  relationship?: TestimonialRelationship;
  engagement?: string;
  status: TestimonialStatus;
  source: TestimonialSource;
  consent: ITestimonialConsent;
  email?: string;
  order: number;
  publishedAt?: Date;
  createdAt?: Date;
};

type LeanInvite = {
  _id: Types.ObjectId;
  token: string;
  clientName: string;
  email?: string;
  note?: string;
  status: ReviewInviteStatus;
  expiresAt: Date;
  submittedAt?: Date;
  createdAt?: Date;
};

const toPublic = (doc: LeanTestimonial): PublicTestimonial => ({
  id: String(doc._id),
  rating: doc.rating,
  headline: doc.headline,
  body: doc.body,
  author: {
    name: doc.author.name,
    role: doc.author.role,
    company: doc.author.company,
    photoUrl: doc.author.photoUrl,
    photoPublicId: doc.author.photoPublicId,
  },
  relationship: doc.relationship,
  engagement: doc.engagement,
  publishedAt: doc.publishedAt?.toISOString(),
});

const toAdmin = (doc: LeanTestimonial): AdminTestimonial => ({
  ...toPublic(doc),
  status: doc.status,
  source: doc.source,
  email: doc.email,
  order: doc.order,
  consent: {
    agreed: doc.consent.agreed,
    at: doc.consent.at.toISOString(),
    version: doc.consent.version,
    text: doc.consent.text,
  },
  createdAt: doc.createdAt?.toISOString(),
});

const toAdminInvite = (doc: LeanInvite): AdminInvite => ({
  id: String(doc._id),
  token: doc.token,
  clientName: doc.clientName,
  email: doc.email,
  note: doc.note,
  status: doc.status,
  expiresAt: doc.expiresAt.toISOString(),
  isExpired:
    doc.status === ReviewInviteStatus.Pending &&
    doc.expiresAt.getTime() <= Date.now(),
  submittedAt: doc.submittedAt?.toISOString(),
  createdAt: doc.createdAt?.toISOString(),
});

// ---------------------------------------------------------------------------
// Invites
// ---------------------------------------------------------------------------

export const DEFAULT_INVITE_DAYS = 14;

/** 32 URL-safe characters, used directly as the /review/[token] path segment. */
export const generateInviteToken = (): string =>
  randomBytes(24).toString("base64url");

/**
 * Hash a submitter IP with a server-side salt. Coarse abuse signal only, and
 * deliberately not reversible: we never need to know the address, only whether
 * two submissions came from the same one.
 */
export const hashIp = (ip: string, salt: string): string =>
  createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);

export const createInvite = async (input: {
  clientName: string;
  email?: string;
  note?: string;
  expiresInDays?: number;
}): Promise<AdminInvite> => {
  const days = input.expiresInDays ?? DEFAULT_INVITE_DAYS;
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  const invite = await ReviewInvite.create({
    token: generateInviteToken(),
    clientName: input.clientName,
    email: input.email || undefined,
    note: input.note || undefined,
    status: ReviewInviteStatus.Pending,
    expiresAt,
  });

  return toAdminInvite(invite.toObject() as LeanInvite);
};

export type InviteState =
  | "valid"
  | "not_found"
  | "expired"
  | "revoked"
  | "submitted";

export type InviteLookup =
  | { state: "valid"; invite: AdminInvite }
  | { state: Exclude<InviteState, "valid">; invite: AdminInvite | null };

/**
 * Resolve a token for the public review page. Returns a state rather than
 * throwing so the page can explain what happened instead of 404ing on a link
 * the client was legitimately sent.
 */
export const lookupInvite = async (token: string): Promise<InviteLookup> => {
  const doc = await ReviewInvite.findOne({ token }).lean<LeanInvite | null>();
  if (!doc) return { state: "not_found", invite: null };

  const invite = toAdminInvite(doc);

  if (doc.status === ReviewInviteStatus.Revoked) {
    return { state: "revoked", invite };
  }
  if (doc.status === ReviewInviteStatus.Submitted) {
    return { state: "submitted", invite };
  }
  if (doc.expiresAt.getTime() <= Date.now()) {
    return { state: "expired", invite };
  }
  return { state: "valid", invite };
};

export const listInvites = async (limit = 50): Promise<AdminInvite[]> => {
  const docs = await ReviewInvite.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<LeanInvite[]>();
  return docs.map(toAdminInvite);
};

export const revokeInvite = async (id: string): Promise<boolean> => {
  const res = await ReviewInvite.updateOne(
    { _id: id, status: ReviewInviteStatus.Pending },
    { $set: { status: ReviewInviteStatus.Revoked } }
  );
  return res.modifiedCount === 1;
};

// ---------------------------------------------------------------------------
// Submission
// ---------------------------------------------------------------------------

export type SubmitReviewInput = {
  token: string;
  rating: number;
  body: string;
  name: string;
  role: string;
  company?: string;
  headline?: string;
  relationship?: TestimonialRelationship;
  engagement?: string;
  photoUrl?: string;
  photoPublicId?: string;
  consentAgreed: boolean;
  submitterIpHash?: string;
};

export type SubmitReviewResult =
  | { ok: true; id: string }
  | { ok: false; reason: Exclude<InviteState, "valid"> | "consent_required" };

/**
 * Record a client's review against their invite.
 *
 * The invite is claimed with a conditional atomic update *before* the
 * testimonial is written, so two concurrent submissions on the same link cannot
 * both succeed: whichever loses the race sees no matched document and is told
 * the invite was already submitted. If the testimonial write then fails, the
 * claim is released so the client can retry.
 */
export const submitReview = async (
  input: SubmitReviewInput
): Promise<SubmitReviewResult> => {
  if (!input.consentAgreed) {
    return { ok: false, reason: "consent_required" };
  }

  const now = new Date();

  const claimed = await ReviewInvite.findOneAndUpdate(
    {
      token: input.token,
      status: ReviewInviteStatus.Pending,
      expiresAt: { $gt: now },
    },
    { $set: { status: ReviewInviteStatus.Submitted, submittedAt: now } },
    { new: true }
  );

  if (!claimed) {
    // Nothing matched. Re-read to tell the client *why*.
    const { state } = await lookupInvite(input.token);
    return {
      ok: false,
      reason: state === "valid" ? "submitted" : state,
    };
  }

  try {
    const testimonial = await Testimonial.create({
      rating: input.rating,
      headline: input.headline || undefined,
      body: input.body,
      author: {
        name: input.name,
        role: input.role,
        company: input.company || undefined,
        photoUrl: input.photoUrl || undefined,
        photoPublicId: input.photoPublicId || undefined,
      },
      relationship: input.relationship,
      engagement: input.engagement || undefined,
      status: TestimonialStatus.Pending,
      source: TestimonialSource.Invite,
      consent: {
        agreed: true,
        at: now,
        version: CONSENT_VERSION,
        text: CONSENT_TEXT,
      },
      email: claimed.email,
      inviteToken: input.token,
      submitterIpHash: input.submitterIpHash,
    });

    claimed.testimonialId = testimonial._id as Types.ObjectId;
    await claimed.save();

    return { ok: true, id: String(testimonial._id) };
  } catch (err) {
    // Release the claim so a retry is possible, then let the caller surface it.
    await ReviewInvite.updateOne(
      { _id: claimed._id },
      {
        $set: { status: ReviewInviteStatus.Pending },
        $unset: { submittedAt: "" },
      }
    );
    throw err;
  }
};

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

/** Published testimonials in display order. This is what the site renders. */
export const listPublishedTestimonials = async (
  limit = 12
): Promise<PublicTestimonial[]> => {
  const docs = await Testimonial.find({ status: TestimonialStatus.Published })
    .sort({ order: 1, publishedAt: -1 })
    .limit(limit)
    .lean<LeanTestimonial[]>();
  return docs.map(toPublic);
};

export const listTestimonialsByStatus = async (
  status: TestimonialStatus,
  limit = 100
): Promise<AdminTestimonial[]> => {
  const docs = await Testimonial.find({ status })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit)
    .lean<LeanTestimonial[]>();
  return docs.map(toAdmin);
};

export const setTestimonialStatus = async (
  id: string,
  status: TestimonialStatus
): Promise<boolean> => {
  const update: Record<string, unknown> = { status };

  // Stamp publishedAt the first time it goes live, and leave it in place
  // afterwards so unpublish/republish doesn't reshuffle the display order.
  if (status === TestimonialStatus.Published) {
    const existing = await Testimonial.findById(id)
      .select("publishedAt")
      .lean<{ publishedAt?: Date } | null>();
    if (existing && !existing.publishedAt) update.publishedAt = new Date();
  }

  const res = await Testimonial.updateOne({ _id: id }, { $set: update });
  return res.matchedCount === 1;
};

/**
 * Move a published testimonial one place earlier or later in display order.
 *
 * Rather than nudging a single `order` value, this rewrites the whole published
 * sequence to 0..n-1 after the swap. That is deliberate: seeded and newly
 * submitted rows can share an `order` of 0, so incrementing one value would
 * leave ties whose resolution depends on `publishedAt` and make the buttons
 * behave unpredictably. Normalising makes each click move exactly one position.
 *
 * Returns false when the item is already at the end it is being moved toward,
 * or is not published (ordering only affects what the site renders).
 */
export const moveTestimonial = async (
  id: string,
  direction: "up" | "down"
): Promise<boolean> => {
  const ordered = await Testimonial.find({ status: TestimonialStatus.Published })
    .sort({ order: 1, publishedAt: -1 })
    .select("_id")
    .lean<{ _id: Types.ObjectId }[]>();

  const from = ordered.findIndex((doc) => String(doc._id) === id);
  if (from === -1) return false;

  const to = direction === "up" ? from - 1 : from + 1;
  if (to < 0 || to >= ordered.length) return false;

  const rearranged = [...ordered];
  [rearranged[from], rearranged[to]] = [rearranged[to], rearranged[from]];

  await Testimonial.bulkWrite(
    rearranged.map((doc, index) => ({
      updateOne: { filter: { _id: doc._id }, update: { $set: { order: index } } },
    }))
  );

  return true;
};

/**
 * Permanently delete a testimonial.
 *
 * Returns the Cloudinary `publicId` that the caller must then destroy, rather
 * than destroying it here. That keeps this module free of both `next/*` and the
 * Cloudinary SDK so it stays portable to the backend, and it keeps the storage
 * concern with the layer that owns credentials.
 *
 * Unlike Reject this is real erasure: the review text, name, email and IP hash
 * all go. Use it for takedown requests and clearing test data, not for everyday
 * moderation.
 */
export const deleteTestimonial = async (
  id: string
): Promise<{ deleted: boolean; photoPublicId?: string }> => {
  const doc = await Testimonial.findByIdAndDelete(id).lean<{
    author?: { photoPublicId?: string };
  } | null>();

  if (!doc) return { deleted: false };
  return { deleted: true, photoPublicId: doc.author?.photoPublicId };
};

/**
 * Permanently delete an invite.
 *
 * Any status, including submitted ones that revoke cannot touch. Deliberately
 * does not touch the testimonial it produced: the invite is only the delivery
 * mechanism, so clearing out spent links can never pull a published review off
 * the site. The review's `inviteToken` is left dangling, which is harmless.
 */
export const deleteInvite = async (id: string): Promise<boolean> => {
  const res = await ReviewInvite.findByIdAndDelete(id);
  return res !== null;
};

export const countTestimonialsByStatus = async (): Promise<
  Record<TestimonialStatus, number>
> => {
  const rows = await Testimonial.aggregate<{ _id: TestimonialStatus; n: number }>(
    [{ $group: { _id: "$status", n: { $sum: 1 } } }]
  );

  const counts: Record<TestimonialStatus, number> = {
    [TestimonialStatus.Pending]: 0,
    [TestimonialStatus.Published]: 0,
    [TestimonialStatus.Rejected]: 0,
  };
  for (const row of rows) {
    if (row._id in counts) counts[row._id] = row.n;
  }
  return counts;
};

export { TestimonialStatus, TestimonialRelationship, TestimonialSource };
export { ReviewInviteStatus };
