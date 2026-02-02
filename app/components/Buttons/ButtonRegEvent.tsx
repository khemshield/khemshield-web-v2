"use client";

import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import Heading from "../Generics/Heading";
import Button from "./Button";

import anticipate from "@/public/assets/images/anticipate.jpg";
import { Add } from "iconsax-react";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";

interface Props {
  ongoing: boolean;
}
const ButtonRegEvent = ({
  children,
  ongoing,
}: Readonly<PropsWithChildren<Props>>) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      {/* Dialog Overlay */}
      <dialog
        onClick={handleCloseDialog}
        className={`${
          showDialog ? "scale-100" : "scale-0"
        } duration-50 fixed px-4 h-screen top-0 right-0 bottom-0 left-0 flex 
      items-center justify-center z-50 bg-black/90`}
      >
        {/* Dialog Content */}
        <section
          onClick={(e) => e.stopPropagation()} // Prevent the overlay from closing when the content is clicked
          className={`${
            showDialog ? "scale-100" : "scale-0"
          } flex flex-col duration-300 delay-150 bg-white p-6 rounded-xl 
          
          lg:w-[60%] lg:gap-12 lg:flex-row`}
        >
          <div className="justify-end flex lg:hidden mb-4">
            <button onClick={handleCloseDialog}>
              <Add className=" w-10 h-10 rotate-45" />
            </button>
          </div>
          <div>
            <Image
              src={anticipate}
              alt="anticipate"
              className="h-[300px] object-cover rounded-xl 
              lg:max-w-[300px]"
            />
          </div>

          <div>
            <div className="justify-end hidden lg:flex">
              <button onClick={handleCloseDialog}>
                <Add className=" w-8 h-8 rotate-45" />
              </button>
            </div>
            <BaseSpacing />
            <Heading variant="h2">Registration Opens Soon!</Heading>
            <BaseSpacing />
            <Text>
              Thank you for your interest in our Web Development and
              Cybersecurity Training Program. Registration for this exciting
              event begins on <span className="font-semibold">Thursday</span>,
              so be sure to mark your calendar!
            </Text>
            <ContentSpacing />
            <div onClick={handleCloseDialog} className="mb-8">
              <EventRegistration />
            </div>
          </div>
        </section>
      </dialog>

      <Button
        // onClick={handleShowDialog}
        shouldDisable={!ongoing}
        variant="primary"
        styles="text-xs md:text-sm lg:text-base py-4 lg:py-2"
        elementType="link"
        href={`/event/${eventSlug}/register`}
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonRegEvent;

const generateGoogleCalendarLink = (eventDetails: {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
}) => {
  const { title, description, location, startTime, endTime } = eventDetails;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;
};

import React from "react";
import ContentSpacing from "../Spacing/ContentSpacing";
import { eventSlug } from "@/app/(main)/event/eventSlug";

const EventRegistration: React.FC = () => {
  const eventDetails = {
    title: "Web Development and Cybersecurity Training",
    description:
      "Join us for a two-week virtual training program to learn in-demand web development and cybersecurity skills.",
    location: "Online",
    startTime: "20240918T120000Z", // Start time in UTC (YYYYMMDDTHHmmssZ)
    endTime: "20240918T133000Z", // End time in UTC
  };

  const googleCalendarLink = generateGoogleCalendarLink(eventDetails);

  return (
    <div>
      <a
        href={googleCalendarLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add to Google Calendar
      </a>
    </div>
  );
};
