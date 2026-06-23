import Logo from "../Generics/Logo";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";
import Socials, { SocialType } from "./Socials";

import instagram from "@/public/assets/images/instagram.png";
import linkedin from "@/public/assets/images/linkedin.png";
import youtube from "@/public/assets/images/youtube.png";

export const defaultSocials: SocialType[] = [
  {
    src: linkedin,
    alt: "linkedin",
    href: "https://www.linkedin.com/company/khemshield/",
  },
  {
    src: instagram,
    alt: "instagram",
    href: "https://www.instagram.com/etz_khemshield?igsh=eWZrNW02b3U5azFz",
  },
  {
    src: youtube,
    alt: "youtube",
    href: "https://www.youtube.com/@khemshield?sub_confirmation=1",
  },
  // { src: twitter, alt: "twitter", href: "" },
];

const FooterAbout = () => {
  return (
    <section
      className=" min-w-[250px] 
    lg:max-w-[250px]
    xl:max-w-[300px]"
    >
      <Logo withText />
      <BaseSpacing />
      <Text color="gray">
        We build and defend with security and AI at the core, from threat
        protection and secure cloud software to AI-powered and agentic systems, and we train the next generation of builders and defenders.
      </Text>
      <BaseSpacing />
      <Socials socials={defaultSocials} />
    </section>
  );
};

export default FooterAbout;
