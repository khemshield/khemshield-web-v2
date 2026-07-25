import { Star1 } from "iconsax-react";

interface Props {
  /** 0 to 5. Halves are rendered as half-filled stars. */
  rating: number;
  size?: number;
  styles?: string;
}

/**
 * Read-only star row.
 *
 * Renders a partially filled star by layering a filled star over an empty one
 * inside a clipped box, so a 4.5 reads as four and a half rather than being
 * rounded away. Half values exist because one of the original testimonials was
 * recorded as 4.5, the submission form itself only offers whole stars.
 */
const StarRating = ({ rating, size = 20, styles = "" }: Readonly<Props>) => {
  const clamped = Math.min(5, Math.max(0, rating));
  const rounded = Math.round(clamped * 2) / 2;

  return (
    <div
      className={`flex items-center gap-1 ${styles}`}
      role="img"
      aria-label={`Rated ${rounded} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.min(1, Math.max(0, rounded - index));

        return (
          <span
            key={index}
            className="relative inline-flex shrink-0"
            style={{ width: size, height: size }}
          >
            <Star1 variant="Bold" size={size} className="text-gray-300" />
            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star1
                  variant="Bold"
                  size={size}
                  className="text-orange-400"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
