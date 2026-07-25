import { Schema, model, models, type Document, type Model } from "mongoose";

/**
 * A client review, published on the site as a testimonial.
 *
 * PORTABLE: this file is written to drop into
 * `backend/app/modules/testimonial/testimonial.model.ts` unchanged once the
 * backend is back. It imports nothing from Next. The only Next-specific detail
 * is the `models.Testimonial ||` guard, which is harmless on the backend (there
 * is no hot reload there, so the left side is always undefined).
 */

export enum TestimonialStatus {
  Pending = "pending",
  Published = "published",
  Rejected = "rejected",
}

export enum TestimonialRelationship {
  Student = "student",
  Client = "client",
}

export enum TestimonialSource {
  /** Submitted by a client through a /review/[token] invite link. */
  Invite = "invite",
  /** Loaded by scripts/seedTestimonials.ts from the pre-database originals. */
  Seed = "seed",
}

export interface ITestimonialAuthor {
  name: string;
  role: string;
  company?: string;
  /**
   * Either an absolute Cloudinary delivery URL (invite submissions) or a
   * site-relative /assets path (seeded originals). Both are renderable by
   * next/image, see app/lib/cloudinary.ts for the transform helper.
   */
  photoUrl?: string;
  /** Cloudinary public id. Absent for seeded originals. */
  photoPublicId?: string;
}

export interface ITestimonialConsent {
  agreed: boolean;
  at: Date;
  version: string;
  /** Verbatim wording shown at submission time. See consent.ts. */
  text: string;
}

export interface ITestimonial extends Document {
  rating: number;
  headline?: string;
  body: string;
  author: ITestimonialAuthor;
  relationship?: TestimonialRelationship;
  /** What Khemshield did for them, e.g. "E-TopUp platform". */
  engagement?: string;
  status: TestimonialStatus;
  source: TestimonialSource;
  consent: ITestimonialConsent;
  /** Contact address, from the invite. Never rendered publicly. */
  email?: string;
  inviteToken?: string;
  /** Salted hash of the submitter IP. Coarse abuse signal, not an identifier. */
  submitterIpHash?: string;
  publishedAt?: Date;
  /** Manual ordering on the site. Lower sorts first, ties break on recency. */
  order: number;
  /** Stable key for idempotent seeding. Absent on real submissions. */
  seedKey?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const authorSchema = new Schema<ITestimonialAuthor>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    photoUrl: { type: String, trim: true },
    photoPublicId: { type: String, trim: true },
  },
  { _id: false }
);

const consentSchema = new Schema<ITestimonialConsent>(
  {
    agreed: { type: Boolean, required: true },
    at: { type: Date, required: true },
    version: { type: String, required: true },
    text: { type: String, required: true },
  },
  { _id: false }
);

const testimonialSchema = new Schema<ITestimonial>(
  {
    // Half stars are allowed because one of the seeded originals was recorded
    // as 4.5. The submission form only offers whole numbers.
    rating: { type: Number, required: true, min: 1, max: 5 },
    headline: { type: String, trim: true, maxlength: 80 },
    body: { type: String, required: true, trim: true, maxlength: 1000 },
    author: { type: authorSchema, required: true },
    relationship: {
      type: String,
      enum: Object.values(TestimonialRelationship),
    },
    engagement: { type: String, trim: true, maxlength: 120 },
    status: {
      type: String,
      enum: Object.values(TestimonialStatus),
      default: TestimonialStatus.Pending,
      index: true,
    },
    source: {
      type: String,
      enum: Object.values(TestimonialSource),
      default: TestimonialSource.Invite,
    },
    consent: { type: consentSchema, required: true },
    email: { type: String, trim: true, lowercase: true },
    inviteToken: { type: String, index: true },
    submitterIpHash: { type: String },
    publishedAt: { type: Date },
    order: { type: Number, default: 0 },
    seedKey: { type: String },
  },
  { timestamps: true }
);

// Drives the site query: published testimonials in display order.
testimonialSchema.index({ status: 1, order: 1, publishedAt: -1 });

// Lets the seed script upsert without creating duplicates on re-run. Sparse so
// the thousands of real submissions without a seedKey don't collide on null.
testimonialSchema.index({ seedKey: 1 }, { unique: true, sparse: true });

const Testimonial: Model<ITestimonial> =
  (models.Testimonial as Model<ITestimonial>) ||
  model<ITestimonial>("Testimonial", testimonialSchema);

export default Testimonial;
