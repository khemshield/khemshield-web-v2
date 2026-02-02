import Image from "next/image";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";
import CountdownTimer from "@/app/(main)/event/CountdownTimer";
import ButtonRegEvent from "../Buttons/ButtonRegEvent";
import ContentSpacing from "../Spacing/ContentSpacing";
import eventBanner from "@/public/assets/images/events/khemshield_jidem.jpg";

interface Props {
  ongoing: boolean;
}

const EventBanner = ({ ongoing }: Readonly<Props>) => {
  return (
    <section
      className="flex flex-col justify-between gap-24
      lg:flex-row"
    >
      <section className="lg:w-1/2 lg:pr-6">
        <p className=" text-primary-normal font-semibold">
          Virtual Training in Web Development and Cybersecurity
        </p>
        <BaseSpacing />
        <Heading variant="h2" styles="lg:text-xl xl:text-[2.5rem]/[3rem]">
          Empowering Warriors with On-Demand Skills for Stress-Free Remote Work
        </Heading>
        <Text styles="my-6">
          A collaboration with the{" "}
          <mark className="bg-transparent font-semibold">Jidem Foundation</mark>
          , designed to enhance your skills in cybersecurity and software
          engineering for remote work success. Led by industry experts, each
          session offers practical, hands-on experience in building secure
          applications and defending against cyber threats.
        </Text>
        <CountdownTimer targetDate="2024-09-24T16:00:00" />
        <ContentSpacing />
        <ButtonRegEvent ongoing={ongoing}>
          Register for this event
        </ButtonRegEvent>
      </section>
      <section className="lg:w-1/2">
        <Image
          src={eventBanner}
          alt="Banner Event"
          className="rounded-xl w-full object-cover
          xl:h-[460px] "
        />
      </section>
    </section>
  );
};

export default EventBanner;
