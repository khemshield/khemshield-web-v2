import Heading from "@/app/components/Generics/Heading";
import Text from "@/app/components/Generics/Text";
import Image from "next/image";
import React from "react";

import cybersecurity_1 from "@/public/assets/images/cybersecurity_1.jpeg";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";

const OurMission = () => {
  return (
    <article
      className=" flex flex-col gap-6
    lg:flex-row"
    >
      <section>
        <Heading variant="h3">Our Mission</Heading>
        <BaseSpacing />
        <Text>
          Our mission is threefold: keep businesses safe as threats evolve and
          AI reshapes the landscape, build the secure software they run on, and
          equip people with the skills the era now demands. We pair real client
          work &mdash; defending and building &mdash; with hands-on training,
          because the two sharpen each other. What we secure and ship in the
          field is what we teach in the classroom.
        </Text>
      </section>
      <section>
        <Image
          src={cybersecurity_1}
          alt="Cybersecutiy"
          className="  h-[275px] object-cover rounded-lg
          lg:max-w-[610px]"
        />
      </section>
    </article>
  );
};

export default OurMission;
