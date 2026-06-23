import Image from "next/image";

import training_2 from "@/public/assets/images/training_2.jpg";
import Heading from "../Generics/Heading";
import Reasons from "./Reasons";

const WhyChooseUs = () => {
  return (
    <section className="bg-support py-20 lg:py-28">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <Image
              src={training_2}
              alt="Students in a Khemshield workshop"
              className="h-[340px] w-full rounded-2xl object-cover shadow-khemshadow lg:h-[520px]"
            />
            <span
              className="absolute bottom-5 left-5 rounded-full bg-ink/85 px-4 py-2
              font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm"
            >
              Hands-on, mentor-led
            </span>
          </div>

          {/* Copy + reasons */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-normal">
              Why Khemshield
            </p>
            <div className="mt-4">
              <Heading variant="h2">
                Why teams trust us with security and AI
              </Heading>
            </div>
            <div className="mt-8">
              <Reasons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
