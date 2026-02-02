import Logo from "../Generics/Logo";
import Text from "../Generics/Text";
import BaseSpacing from "../Spacing/BaseSpacing";
import Socials, { SocialType } from "./Socials";

import instagram from "@/public/assets/images/instagram.png";
import linkedin from "@/public/assets/images/linkedin.png";

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
      <Text>
        we specialize in secure web and mobile application development,
        comprehensive cybersecurity solutions, and professional training
        programs. Our mission is to protect your business and empower future IT
        professionals with the skills they need.
      </Text>
      <BaseSpacing />
      <Socials socials={defaultSocials} />
    </section>
  );
};

export default FooterAbout;
