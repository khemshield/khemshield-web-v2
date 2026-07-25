"use client";

import Testimonial from "@/app/components/Testimonials/Testimonial";
import Text from "@/app/components/Generics/Text";
import type { PublicTestimonial } from "@/app/lib/reviews/review.service";

export type PreviewValues = {
  rating: number;
  body: string;
  name: string;
  role: string;
  company: string;
  headline: string;
  engagement: string;
  photoUrl?: string;
};

/**
 * Live preview of the review as it will appear on the site.
 *
 * Renders the real `Testimonial` component rather than a lookalike, so this
 * cannot drift from the homepage. Empty required fields get placeholder text so
 * the card has a shape from the start instead of collapsing.
 *
 * The `PublicTestimonial` import is types-only, so nothing from the service (and
 * therefore no mongoose) reaches the client bundle.
 */
const PLACEHOLDER_BODY =
  "Your review will appear here as you type, exactly as visitors to our site will see it.";

const ReviewPreview = ({ values }: Readonly<{ values: PreviewValues }>) => {
  const preview: PublicTestimonial = {
    id: "preview",
    rating: values.rating,
    headline: values.headline.trim() || undefined,
    body: values.body.trim() || PLACEHOLDER_BODY,
    author: {
      name: values.name.trim() || "Your name",
      role: values.role.trim() || "Your role",
      company: values.company.trim() || undefined,
      photoUrl: values.photoUrl,
    },
    engagement: values.engagement.trim() || undefined,
  };

  return (
    <section
      aria-live="polite"
      className="rounded-xl border border-secondary-normal/20 bg-primary-container/20 p-6"
    >
      <Text type="caption" variant="semibold" color="gray" styles="mb-5">
        How this will appear on our site
      </Text>
      <Testimonial testimonial={preview} />
    </section>
  );
};

export default ReviewPreview;
