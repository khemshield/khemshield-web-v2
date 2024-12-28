import Heading from "@/app/components/Generics/Heading";
import HR from "@/app/components/Generics/HR";
import Text from "@/app/components/Generics/Text";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import SectionSpacing from "@/app/components/Spacing/SectionSpacing";
import { Clock, Location, PresentionChart } from "iconsax-react";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { IoVideocamOutline } from "react-icons/io5";

import jidem_transparent from "@/public/assets/images/events/jidem_transparent.png";
import Dot from "../../../components/Generics/Dot";

interface Props {
  eventSchedule: {
    facilitator: {
      name: string;
      image: StaticImageData;
    };
    curriculum: {
      topic: string;
      subject: string;
      content: string;
    };

    time: {
      from: string;
      to: string;
    };
    location: string;
    perks: { icon: string | ReactNode; title: string }[];
  };
  jidemTalk?: { subject: string; content: string };
}
const EventScheduleContent = ({
  eventSchedule: {
    facilitator: { image, name },
    time: { from, to },
    curriculum: { topic, subject, content },
    location,
    perks,
  },
  jidemTalk,
}: Readonly<Props>) => {
  return (
    <section className=" flex flex-col lg:flex-row">
      <aside className=" lg:px-8 lg:w-1/5 ">
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt="Abdul Kareem"
            className="min-w-16 min-h-16 w-16 h-16 rounded-full object-cover"
          />
          {jidemTalk && <Dot />}
          {jidemTalk && (
            <Image
              src={jidem_transparent}
              alt="Abdul Kareem"
              className="  object-contain"
            />
          )}
        </div>

        <Text styles="mt-2">{name}</Text>
        <Text color="primary" styles=" text-sm">
          {topic}
        </Text>
        <BaseSpacing />
        <HR />
        <BaseSpacing />

        <ul>
          {perks.map(({ icon, title }, i) => (
            <li
              key={i}
              className="flex gap-2 items-center text-gray-400 text-sm my-3"
            >
              {icon} <p>{title}</p>
            </li>
          ))}
        </ul>
      </aside>

      <article
        className=" bg-primary-light/20 p-2 self-start
        hover:bg-primary-normal duration-200 lg:w-[80%]"
      >
        <section className=" relative overflow-hidden">
          <section className=" bg-white px-4 lg:px-10 py-12">
            <div
              className="flex items-center
          text-primary-normal gap-6"
            >
              <span className="flex items-center gap-2">
                <Clock size={18} />{" "}
                <Text color="primary">
                  {from} - {to}
                </Text>
              </span>
              <span className="flex items-center gap-2">
                <Location size={18} /> <Text color="primary">{location}</Text>
              </span>
            </div>
            <ContentSpacing />
            {jidemTalk && (
              <>
                <Heading variant="h4">{jidemTalk.subject}</Heading>
                <BaseSpacing />
                <Text>{jidemTalk.content}</Text>
                <BaseSpacing />
              </>
            )}
            <Heading variant="h4">{subject}</Heading>
            <BaseSpacing />
            <Text>{content}</Text>
            <SectionSpacing />
          </section>
          <div
            className=" h-32 w-32 bg-primary-normal rounded-full p-9
           absolute -bottom-8 -right-8"
          >
            {location.toLowerCase() === "zoom" ? (
              <IoVideocamOutline
                size={32}
                className=" text-white animate-bounce"
              />
            ) : (
              <PresentionChart
                size={32}
                className="text-white animate-bounce"
              />
            )}
          </div>
        </section>
      </article>
    </section>
  );
};

export default EventScheduleContent;
