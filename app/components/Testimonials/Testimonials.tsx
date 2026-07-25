import connectDB from "@/app/lib/db/connect";
import { listPublishedTestimonials } from "@/app/lib/reviews/review.service";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import Wrapper from "../Generics/Wrapper";
import ContentSpacing from "../Spacing/ContentSpacing";
import Testimonial from "./Testimonial";
import TestimonialsCarousel from "./TestimonialsCarousel";

/**
 * Published client reviews.
 *
 * Reads from the database rather than a static file, so approving a review in
 * /studio/reviews puts it on the site. Renders nothing at all when there is
 * nothing published, which is better than an empty carousel with dots.
 *
 * TEMPORARY data source: goes through app/lib/reviews/ while the Render backend
 * is down. When the backend is back this becomes a GraphQL query and only this
 * component's data-fetching line changes.
 */
const Testimonials = async () => {
  let testimonials;

  try {
    await connectDB();
    testimonials = await listPublishedTestimonials();
  } catch (err) {
    // A database problem should not take the homepage down with it. Log and drop
    // the section, the rest of the page is unaffected.
    console.error("[testimonials] could not load published reviews:", err);
    return null;
  }

  if (testimonials.length === 0) return null;

  return (
    <Wrapper>
      <Heading variant="h2">What our clients say</Heading>
      <Text color="gray" styles="mt-2">
        From the businesses we build for and the people we train.
      </Text>
      <ContentSpacing />

      <TestimonialsCarousel count={testimonials.length}>
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} />
        ))}
      </TestimonialsCarousel>
    </Wrapper>
  );
};

export default Testimonials;
