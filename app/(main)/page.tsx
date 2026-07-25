import type { Metadata } from "next";
import HomeBanner from "../components/Banners/HomeBanner";
import CallToActionBanner from "../components/CallToActions/CallToActionBanner";
import TrustedBy from "../components/Generics/TrustedBy";
import Wrapper from "../components/Generics/Wrapper";
import OurServices from "../components/OurServices/OurServices";
import ContentSpacing from "../components/Spacing/ContentSpacing";
import Testimonials from "../components/Testimonials/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import HomeBlog from "../components/Blog/HomeBlog";
import TeachingShowcase from "../components/Team/TeachingShowcase";

export const metadata: Metadata = {
  description:
    "Khemshield delivers secure IT solutions and practical tech training, from cybersecurity and software engineering to AI, helping businesses and learners thrive.",
  alternates: { canonical: "/" },
};

// The testimonials section reads from the database, so the page is regenerated
// hourly rather than on every request. Publishing a review in /studio/reviews
// calls revalidatePath("/"), so approvals appear immediately and this interval is
// only a backstop.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <main>
      <HomeBanner />
      <ContentSpacing />
      <TeachingShowcase />
      <ContentSpacing />
      <Wrapper>
        <TrustedBy />
      </Wrapper>
      <ContentSpacing />
      <WhyChooseUs />
      <ContentSpacing />
      <OurServices />
      <ContentSpacing />
      <HomeBlog />
      <ContentSpacing />
      <CallToActionBanner />
      <ContentSpacing />
      <Testimonials />
      {/* <InfiniteCarousel /> */}
      <ContentSpacing />
    </main>
  );
}
