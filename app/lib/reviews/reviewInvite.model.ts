import {
  Schema,
  model,
  models,
  type Document,
  type Model,
  type Types,
} from "mongoose";

/**
 * A single-use invitation for one client to leave one review.
 *
 * PORTABLE: drops into `backend/app/modules/testimonial/reviewInvite.model.ts`
 * unchanged. Imports nothing from Next.
 */

export enum ReviewInviteStatus {
  Pending = "pending",
  Submitted = "submitted",
  Revoked = "revoked",
}

export interface IReviewInvite extends Document {
  /** Random 32-char base64url string, the /review/[token] path segment. */
  token: string;
  clientName: string;
  email?: string;
  /** Internal note, e.g. "E-TopUp project, follow up after handover". */
  note?: string;
  status: ReviewInviteStatus;
  expiresAt: Date;
  submittedAt?: Date;
  testimonialId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const reviewInviteSchema = new Schema<IReviewInvite>(
  {
    token: { type: String, required: true, unique: true },
    clientName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    note: { type: String, trim: true, maxlength: 300 },
    status: {
      type: String,
      enum: Object.values(ReviewInviteStatus),
      default: ReviewInviteStatus.Pending,
      index: true,
    },
    expiresAt: { type: Date, required: true },
    submittedAt: { type: Date },
    testimonialId: { type: Schema.Types.ObjectId, ref: "Testimonial" },
  },
  { timestamps: true }
);

const ReviewInvite: Model<IReviewInvite> =
  (models.ReviewInvite as Model<IReviewInvite>) ||
  model<IReviewInvite>("ReviewInvite", reviewInviteSchema);

export default ReviewInvite;
