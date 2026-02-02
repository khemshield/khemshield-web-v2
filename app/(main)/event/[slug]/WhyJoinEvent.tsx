import certificate from "@/public/assets/images/events/certificate.png";
import mentorship from "@/public/assets/images/events/mentorship.png";
import network from "@/public/assets/images/events/networking.png";
import speaker from "@/public/assets/images/events/speaker.png";
import EventReason from "./EventReason";
import Text from "@/app/components/Generics/Text";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import Heading from "@/app/components/Generics/Heading";
import CountdownTimer from "../CountdownTimer";
import Button from "@/app/components/Buttons/Button";
import ButtonRegEvent from "@/app/components/Buttons/ButtonRegEvent";

const reasons = [
  {
    heading: "Networking",
    icon: network,
  },
  {
    heading: "Unique Facilitators",
    icon: speaker,
  },
  {
    heading: "Certificate",
    icon: certificate,
  },
  {
    heading: "Live Mentorship",
    icon: mentorship,
  },
];

const WhyJoinEvent = () => {
  return (
    <section
      className="flex flex-col gap-12
        lg:flex-row"
    >
      <section className="lg:w-1/2">
        <ul className=" grid lg:grid-cols-2 gap-y-12 ">
          {reasons.map(({ icon, heading }, index) => (
            <li key={heading}>
              <EventReason
                key={heading}
                number={index + 1}
                reason={heading}
                icon={icon}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="lg:w-1/2">
        <Text color="primary" styles="font-semibold">
          Why Join Event
        </Text>
        <BaseSpacing />
        <Heading variant="h2">Why You Should Join The Event</Heading>
        <BaseSpacing />
        <Text>
          Join our event at no cost and connect with industry leaders, learn
          from unique speakers each day over two weeks—three days each week, and
          earn a certificate of completion. This web development and
          cybersecurity training is tailored for warriors passionate about tech
          and eager to explore potential career paths. With an emphasis on
          giving participants a clear overview to help guide their career
          choices, the event also offers live mentorship. Seize this exceptional
          opportunity to empower yourself with in-demand skills for a successful
          future in tech.
        </Text>
        <BaseSpacing />
        <CountdownTimer targetDate="2024-09-24T16:00:00" />
        <BaseSpacing />

        <ButtonRegEvent ongoing={false}>Reserve Your Spot</ButtonRegEvent>
      </section>
    </section>
  );
};

export default WhyJoinEvent;
