import Image from "next/image";

import { ArrowDown2, ArrowUp2 } from "iconsax-react";

import StarRating from "@/app/components/Reviews/StarRating";
import { testimonialPhotoUrl } from "@/app/lib/cloudinary";
import {
  TestimonialStatus,
  type AdminTestimonial,
} from "@/app/lib/reviews/review.service";

import ConfirmButton from "./ConfirmButton";
import {
  deleteTestimonialAction,
  moveTestimonialAction,
  setStatusAction,
} from "./actions";

const formatDate = (iso?: string): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

/**
 * Position controls for a published testimonial.
 *
 * Only rendered for published items, because `order` decides what leads on the
 * homepage and has no meaning for pending or rejected ones. Reordering is
 * non-destructive, so unlike publish/reject these act immediately with no
 * confirmation step.
 */
const OrderControls = ({
  id,
  position,
  total,
}: {
  id: string;
  position: number;
  total: number;
}) => (
  <div className="flex items-center gap-1">
    <span className="mr-1 text-xs text-gray-500">
      #{position + 1} of {total} on the site
    </span>

    {(["up", "down"] as const).map((direction) => {
      const disabled =
        direction === "up" ? position === 0 : position === total - 1;

      return (
        <form key={direction} action={moveTestimonialAction}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="direction" value={direction} />
          <button
            type="submit"
            disabled={disabled}
            aria-label={
              direction === "up" ? "Move earlier on the site" : "Move later on the site"
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg border
            border-gray-300 text-gray-700 disabled:opacity-30"
          >
            {direction === "up" ? (
              <ArrowUp2 size={14} />
            ) : (
              <ArrowDown2 size={14} />
            )}
          </button>
        </form>
      );
    })}
  </div>
);

const Who = ({ review }: { review: AdminTestimonial }) => (
  <strong className="font-semibold text-secondary-normal">
    {review.author.name}
    {review.author.company ? ` (${review.author.company})` : ""}
  </strong>
);

interface Props {
  review: AdminTestimonial;
  /** Zero-based place in the published list. Only passed for published items. */
  position?: number;
  /** How many are published in total, for the "#2 of 5" label. */
  total?: number;
}

const ReviewCard = ({ review, position, total }: Readonly<Props>) => {
  const photo = testimonialPhotoUrl(review.author.photoUrl);

  const showOrdering =
    review.status === TestimonialStatus.Published &&
    position !== undefined &&
    total !== undefined &&
    total > 1;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex gap-4">
        {photo ? (
          <Image
            src={photo}
            alt={review.author.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center
            rounded-full bg-gray-100 text-lg font-semibold text-gray-400"
          >
            {review.author.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <StarRating rating={review.rating} size={16} />

          {review.headline && (
            <p className="mt-2 font-semibold text-secondary-normal">
              {review.headline}
            </p>
          )}

          <p className="mt-1 whitespace-pre-line text-sm text-gray-700">
            {review.body}
          </p>

          <p className="mt-3 text-sm font-semibold text-secondary-normal">
            {review.author.name}
            <span className="font-normal text-gray-500">
              {" "}
              &middot; {review.author.role}
              {review.author.company ? `, ${review.author.company}` : ""}
            </span>
          </p>

          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <div>
              <dt className="inline">Source: </dt>
              <dd className="inline">{review.source}</dd>
            </div>
            {review.relationship && (
              <div>
                <dt className="inline">Relationship: </dt>
                <dd className="inline">{review.relationship}</dd>
              </div>
            )}
            {review.engagement && (
              <div>
                <dt className="inline">Worked on: </dt>
                <dd className="inline">{review.engagement}</dd>
              </div>
            )}
            {review.email && (
              <div>
                <dt className="inline">Email: </dt>
                <dd className="inline">{review.email}</dd>
              </div>
            )}
            <div>
              <dt className="inline">Submitted: </dt>
              <dd className="inline">{formatDate(review.createdAt)}</dd>
            </div>
            <div>
              <dt className="inline">Consent: </dt>
              <dd className="inline">
                {review.consent.agreed
                  ? `${review.consent.version} on ${formatDate(review.consent.at)}`
                  : "not given"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
        {showOrdering && (
          <div className="mr-auto">
            <OrderControls
              id={review.id}
              position={position}
              total={total}
            />
          </div>
        )}

        {review.status !== TestimonialStatus.Published && (
          <ConfirmButton
            action={setStatusAction}
            fields={{ id: review.id, status: TestimonialStatus.Published }}
            label="Publish"
            tone="approve"
            title="Publish this review?"
            confirmLabel="Yes, publish"
            pendingLabel="Publishing..."
            description={
              <>
                <p>
                  The review from <Who review={review} /> goes live on the
                  homepage straight away, together with their name, role
                  {review.author.photoUrl ? " and photo" : ""}.
                </p>
                <p>
                  You can take it down again at any time with Unpublish.
                </p>
              </>
            }
          />
        )}

        {review.status === TestimonialStatus.Published && (
          <ConfirmButton
            action={setStatusAction}
            fields={{ id: review.id, status: TestimonialStatus.Pending }}
            label="Unpublish"
            tone="neutral"
            title="Take this off the site?"
            confirmLabel="Yes, unpublish"
            pendingLabel="Removing..."
            description={
              <>
                <p>
                  The review from <Who review={review} /> disappears from the
                  homepage immediately and moves back to your pending list.
                </p>
                <p>
                  Nothing is deleted, and publishing it again later keeps its
                  original position.
                </p>
              </>
            }
          />
        )}

        {review.status !== TestimonialStatus.Rejected && (
          <ConfirmButton
            action={setStatusAction}
            fields={{ id: review.id, status: TestimonialStatus.Rejected }}
            label="Reject"
            tone="danger"
            title="Reject this review?"
            confirmLabel="Yes, reject"
            pendingLabel="Rejecting..."
            description={
              <>
                <p>
                  The review from <Who review={review} /> moves to your rejected
                  list and will not appear on the site
                  {review.status === TestimonialStatus.Published
                    ? ", including removing it from the homepage now"
                    : ""}
                  .
                </p>
                <p>
                  Nothing is deleted and the client is not told. You can publish
                  it later if you change your mind.
                </p>
              </>
            }
          />
        )}

        <ConfirmButton
          action={deleteTestimonialAction}
          fields={{ id: review.id }}
          label="Delete"
          tone="danger"
          title="Delete this review permanently?"
          confirmLabel="Delete permanently"
          pendingLabel="Deleting..."
          description={
            <>
              <p>
                Everything stored for <Who review={review} /> is erased: the
                review text, their name, role
                {review.email ? ", email address" : ""} and the record of their
                consent.
              </p>
              {review.author.photoPublicId && (
                <p>Their photo is also deleted from our image host.</p>
              )}
              {review.status === TestimonialStatus.Published && (
                <p>It disappears from the homepage immediately.</p>
              )}
              <p className="font-semibold text-red-700">
                This cannot be undone.
              </p>
              <p>
                If you only want to take it off the site, use{" "}
                {review.status === TestimonialStatus.Published
                  ? "Unpublish or Reject"
                  : "Reject"}{" "}
                instead. Deleting is for when someone asks to be removed
                entirely.
              </p>
            </>
          }
        />
      </div>
    </article>
  );
};

export default ReviewCard;
