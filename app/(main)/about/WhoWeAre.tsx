import Image from "next/image";
import Text from "@/app/components/Generics/Text";

import training_3 from "@/public/assets/images/training_3.jpg";
import support_1 from "@/public/assets/images/support_1.jpg";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import Heading from "@/app/components/Generics/Heading";

const WhoWeAre = () => {
  return (
    <article
      className="flex flex-col gap-16
    lg:flex-row lg:gap-32"
    >
      <section
        className="relative flex justify-end self-end order-1 
        min-w-[200px] max-w-[88%] 
        lg:order-0
        lg:min-w-[500px] lg:max-w-[500px]
        xl:min-w-[600px] xl:max-w-[600px]"
      >
        <Image
          src={support_1}
          alt="Training Session"
          className=" rounded-full 
      absolute -left-16 top-8 object-cover
      w-[150px] h-[150px] lg:left-0"
        />
        <Image
          src={training_3}
          alt="Training Session"
          className=" rounded-lg object-cover h-[450px]
      lg:max-w-[450px]
      xl:max-w-[550px]"
        />
      </section>
      <section className="order-0 lg:order-1">
        <Text variant="semibold" color="primary">
          Who We Are
        </Text>
        <BaseSpacing />
        <Heading variant={"h3"}>
          Cybersecurity, AI, and the Skills to Build Both
        </Heading>
        <BaseSpacing />
        <Text>
          We&apos;re a team of security engineers, developers, and educators who
          believe the AI era needs both builders and defenders &mdash; so we do
          both. KhemShield secures businesses with cybersecurity and AI-driven
          defense, builds secure web, mobile, and AI-powered software on
          hardened cloud, and trains the next generation to do the same.
          Security, engineering, and intelligence &mdash; treated as one
          discipline, not separate departments.
        </Text>
      </section>
    </article>
  );
};

export default WhoWeAre;
