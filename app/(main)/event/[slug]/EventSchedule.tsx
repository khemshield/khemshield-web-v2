"use client";

import HeadingSub from "@/app/components/Generics/HeadingSub";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import EventScheduleContent from "./EventScheduleContent";
import ScheduleButton from "./ScheduleButton";
import { useState, useRef, useEffect } from "react";
import { eventScheduleData, jidemTalks } from "@/app/data/events";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import NextPrevArrows from "./NextPrevArrows";
import ButtonRegEvent from "@/app/components/Buttons/ButtonRegEvent";

const eventSchedules = eventScheduleData;

const EventSchedule = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Start from 0
  const buttonListRef = useRef<HTMLUListElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll the content when the selected tab changes
  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement)
      contentElement.style.transform = `translateX(-${selectedTab * 100}%)`;
  }, [selectedTab]);

  //  Scroll event for the button list to synchronize with the content
  const handleButtonScroll = () => {
    const buttonListElement = buttonListRef.current;
    if (buttonListElement) {
      const scrollLeft = buttonListElement.scrollLeft;
      const buttonWidth = buttonListElement.scrollWidth / eventSchedules.length; // Calculate button width
      const newSelectedTab = Math.round(scrollLeft / buttonWidth);
      if (newSelectedTab !== selectedTab) {
        setSelectedTab(newSelectedTab); // Update selected tab only if necessary
      }
    }
  };

  const handleNext = () => {
    console.log("CURRENT SELECTED TAB IS: ", selectedTab);
    if (selectedTab < eventSchedules.length - 1) {
      setSelectedTab((prev) => {
        console.log("PREV SELECTED TAB IS: ", prev);

        return prev + 1;
      });

      const buttonListElement = buttonListRef.current;
      if (buttonListElement) {
        const buttonWidth =
          buttonListElement.scrollWidth / eventSchedules.length;
        buttonListElement.scrollBy({
          left: buttonWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrev = () => {
    if (selectedTab > 0) {
      setSelectedTab((prev) => prev - 1);

      const buttonListElement = buttonListRef.current;
      if (buttonListElement) {
        const buttonWidth =
          buttonListElement.scrollWidth / eventSchedules.length;
        buttonListElement.scrollBy({ left: -buttonWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="xl:px-10">
      <HeadingSub subheading="Explore">Event Schedule</HeadingSub>
      <ContentSpacing />
      <NextPrevArrows
        isLast={selectedTab >= eventScheduleData.length - 1}
        isFirst={selectedTab <= 0}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      {/* Scrollable Schedule Button Tabs */}
      <ul
        ref={buttonListRef}
        className="flex gap-4 has-hidden-scrollbar overflow-x-auto 
        scroll-snap-type-inline-mandatory overscroll-behavior-inline-contain"
        onScroll={handleButtonScroll} // Detect scrolling
      >
        {eventSchedules.map(({ day, date }, i) => (
          <ScheduleButton
            key={i}
            onClick={() => setSelectedTab(i)} // Set the selected tab by index
            day={day}
            date={date}
            isActive={i === selectedTab}
          />
        ))}
      </ul>

      <ContentSpacing />

      {/* Scrollable Event Sections */}
      <section className="overflow-x-hidden relative">
        <section
          ref={contentRef}
          className="flex  transition-transform duration-500 ease-in-out has-hidden-scrollbar"
        >
          {eventSchedules.map(
            ({ facilitator, time, curriculum, location, perks }, i) => {
              let jidemTalk = undefined;

              if (i === 0) {
                jidemTalk = jidemTalks[i];
              }

              if (i === eventSchedules.length - 1) {
                jidemTalk = jidemTalks[1];
              }

              return (
                <section key={i} className="min-w-full">
                  {/* Displaying corresponding content */}
                  <EventScheduleContent
                    eventSchedule={{
                      location: location,
                      facilitator: facilitator,
                      time: time,
                      curriculum: curriculum,
                      perks: perks,
                    }}
                    jidemTalk={jidemTalk}
                  />
                  <div>
                    <NextPrevArrows
                      styles=" lg:hidden"
                      isLast={selectedTab >= eventScheduleData.length - 1}
                      isFirst={selectedTab <= 0}
                      handlePrev={handlePrev}
                      handleNext={handleNext}
                    />
                    <div className="flex items-center justify-center my-8">
                      <ButtonRegEvent ongoing={false}>
                        Claim Your Seat
                      </ButtonRegEvent>
                    </div>
                  </div>
                </section>
              );
            }
          )}
        </section>
      </section>
      {/* <NextPrevArrows
        styles="md:hidden"
        isLast={selectedTab >= eventScheduleData.length - 1}
        isFirst={selectedTab <= 0}
        handlePrev={handlePrev}
        handleNext={handleNext}
      /> */}
    </div>
  );
};

export default EventSchedule;
