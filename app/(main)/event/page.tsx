import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import HeaderContent from "@/app/components/Generics/HeaderContent";
import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import Wrapper from "@/app/components/Generics/Wrapper";
import SearchInput from "@/app/components/Inputs/SearchInput";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import Image from "next/image";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import event_1 from "@/public/assets/images/events/event_1.png";
import Button from "@/app/components/Buttons/Button";
import { Clock } from "iconsax-react";
import CountdownTimer from "./CountdownTimer";
import Dot from "./Dot";
import StackedImages from "./StackedImages";
import { speakersImagesData } from "@/app/data/events";
import { Metadata } from "next";
import { eventSlug } from "./eventSlug";

export const metadata: Metadata = {
  title: "Khemshield | Events",
  description: `Explore our upcoming webinars and events on cybersecurity and software engineering. 
    Learn from experts, network with peers, and stay updated on the latest trends. Register now`,
  openGraph: {
    title: "Khemshield | Events",
    description: `Explore our upcoming webinars and events on cybersecurity and software engineering. 
      Learn from experts, network with peers, and stay updated on the latest trends. Register now`,
    images: [
      {
        url: "/assets/images/events/event_1.png", // Make sure the path is correct
        width: 800,
        height: 600,
        alt: "Khemshield Events Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khemshield | Events",
    description: `Explore our upcoming webinars and events on cybersecurity and software engineering. 
      Learn from experts, network with peers, and stay updated on the latest trends. Register now`,
    images: ["/assets/images/events/event_1.png"], // Path to the image
  },
};

const EventPage = () => {
  return (
    <section>
      <Breadcrumb crumbs={[{ href: "", text: "Events and Webinars" }]} />
      <ContentSpacing />
      <Wrapper>
        <HeaderContent heading="Events and Lectures" center isPlainText={false}>
          <p>
            Stay updated with Khemshield’s latest webinars, workshops, and
            lectures. Our events are designed to provide practical insights into
            cybersecurity, software engineering, and more.
          </p>
          <ContentSpacing />
          <SearchInput placeholder="Search For Events" />
        </HeaderContent>
        <ContentSpacing />
        <section
          className="flex flex-col gap-12
        lg:flex-row"
        >
          <section className="min-w-[50%] relative ">
            <div
              className=" bg-white rounded-xl absolute 
              top-6 left-6 h-20 w-20 flex items-center justify-center 
              flex-col"
            >
              <span className=" leading-6 text-xl font-semibold">24</span>
              <span className=" leading-6 text-xl font-semibold">Sept</span>
            </div>
            <Image
              src={event_1}
              alt="2-Week Webinar"
              className="w-full max-h-[500px] object-cover object-bottom rounded-2xl"
            />
          </section>

          <section className="min-w-[50%]">
            <Heading variant={"h3"}>
              Empowering Warriors with On-Demand Skills for Stress-Free Remote
              Work
            </Heading>
            <BaseSpacing />
            <Text
              color="primary"
              styles="text-sm uppercase font-semibold
              lg:text-base"
            >
              Virtual Training in Web Development and Cybersecurity
            </Text>
            <BaseSpacing />
            <section className=" flex items-center gap-3">
              <Text>Free</Text>
              <Dot />
              <StackedImages images={speakersImagesData} />
              <Text color="primary">Facilitators</Text>
            </section>
            <BaseSpacing />
            <section className="flex gap-2 items-center">
              <Clock className=" text-secondary-normal w-5" />
              <div>Sept 24th - Oct 5th</div> (Flexible Time)
            </section>
            <BaseSpacing />
            <Text>
              Step into the future with our two-week virtual training program,
              designed to turn aspiring tech warriors into skilled
              professionals. With a focus on high-demand web development and
              cybersecurity skills, this program empowers you to thrive in
              remote work environments while reducing the stress of uncertain
              times
            </Text>
            <BaseSpacing />
            <CountdownTimer targetDate="2024-09-24T16:00:00" />
            <ContentSpacing />
            <Button
              variant="primary"
              elementType="link"
              href={`/event/${eventSlug}`}
            >
              Learn More
            </Button>
          </section>
        </section>
      </Wrapper>
    </section>
  );
};

export default EventPage;
