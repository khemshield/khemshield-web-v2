import BannerBackground from "@/app/components/Banners/BannerBackground";
import EventBanner from "@/app/components/Banners/EventBanner";
import Wrapper from "@/app/components/Generics/Wrapper";
import SectionSpacing from "@/app/components/Spacing/SectionSpacing";
import EventSchedule from "./EventSchedule";
import EventSpeakers from "./EventSpeakers";
import WhyJoinEvent from "./WhyJoinEvent";

const EventDetailPage = () => {
  return (
    <main>
      <Wrapper>
        <BannerBackground minHeight={"min-h-[1070px] lg:min-h-[670px]"}>
          <EventBanner ongoing={false} />
        </BannerBackground>
        <WhyJoinEvent />
        <SectionSpacing />
        <EventSpeakers />
        <SectionSpacing />
        <EventSchedule />
      </Wrapper>
    </main>
  );
};

export default EventDetailPage;
