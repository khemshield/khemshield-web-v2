import React from "react";

import chaf_event_1 from "@/public/assets/images/events/chaf_event_1.jpg";
import chaf_event_2 from "@/public/assets/images/events/chaf_event_2.jpg";
import chaf_event_3 from "@/public/assets/images/events/chaf_event_3.jpg";
import chaf_event_4 from "@/public/assets/images/events/chaf_event_4.jpg";
import Image from "next/image";

const eventsChafImages = [
  chaf_event_1,
  chaf_event_2,
  chaf_event_3,
  chaf_event_4,
];

const EventFooter = () => {
  return (
    <section
      className="min-w-[250px] 
    lg:max-w-[200px]
    xl:max-w-[250px]"
    >
      <ul className=" grid grid-cols-2 gap-2">
        {eventsChafImages.map((image, i) => (
          <li key={i}>
            <Image src={image} alt="Events" className=" rounded-lg" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventFooter;
