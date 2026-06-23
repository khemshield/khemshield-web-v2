import BannerBackground from "../components/Banners/BannerBackground";
import HomeBanner from "../components/Banners/HomeBanner";
import CallToActionBanner from "../components/CallToActions/CallToActionBanner";
import TrustedBy from "../components/Generics/TrustedBy";
import Wrapper from "../components/Generics/Wrapper";
import OurServices from "../components/OurServices/OurServices";
import ContentSpacing from "../components/Spacing/ContentSpacing";
import Testimonials from "../components/Testimonials/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import HomeBlog from "../components/Blog/HomeBlog";

export default function HomePage() {
  return (
    <main>
      <Wrapper>
        <BannerBackground minHeight="min-h-[990px] lg:min-h-[670px]">
          <HomeBanner />
        </BannerBackground>
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
