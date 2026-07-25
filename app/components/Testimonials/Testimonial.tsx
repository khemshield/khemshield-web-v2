import Image from "next/image";

import StarRating from "@/app/components/Reviews/StarRating";
import { testimonialPhotoUrl } from "@/app/lib/cloudinary";
import type { PublicTestimonial } from "@/app/lib/reviews/review.service";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";

interface Props {
  testimonial: PublicTestimonial;
}

const PHOTO_PX = 164;

const Testimonial = ({ testimonial }: Readonly<Props>) => {
  const { rating, headline, body, author, engagement } = testimonial;

  const photo = testimonialPhotoUrl(author.photoUrl);

  // Role and company as one readable line, with no trailing separator when the
  // company is missing (a student has no company).
  const attribution = [author.role, author.company].filter(Boolean).join(", ");

  return (
    <figure
      className="flex min-w-full flex-col items-center gap-7 text-center
      scroll-snap-align-start sm:flex-row sm:items-start sm:text-left"
    >
      {photo ? (
        <Image
          src={photo}
          alt={author.name}
          width={PHOTO_PX}
          height={PHOTO_PX}
          className="h-[150px] w-[150px] shrink-0 rounded-full object-cover
          xs:h-[164px] xs:w-[164px]"
        />
      ) : (
        <div
          className="flex h-[150px] w-[150px] shrink-0 items-center justify-center
          rounded-full bg-primary-container text-4xl font-semibold
          text-primary-normal xs:h-[164px] xs:w-[164px]"
          aria-hidden="true"
        >
          {author.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div>
        <StarRating rating={rating} styles="justify-center sm:justify-start" />
        <BaseSpacing />

        {headline && (
          <Text variant="semibold" styles="mb-2">
            {headline}
          </Text>
        )}

        <blockquote>
          <p>&ldquo;{body}&rdquo;</p>
        </blockquote>
        <BaseSpacing />

        <figcaption>
          <Text variant="semibold">
            <cite className="not-italic">{author.name}</cite>
          </Text>
          {attribution && <Text color="gray">{attribution}</Text>}
          {engagement && (
            <Text type="caption" color="gray" styles="mt-1">
              {engagement}
            </Text>
          )}
        </figcaption>
      </div>
    </figure>
  );
};

export default Testimonial;
