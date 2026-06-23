import React from "react";
import Wrapper from "../Generics/Wrapper";
import FooterAbout from "./FooterAbout";
import FooterCompany from "./FooterCompany";
import FooterServices from "./FooterServices";
import FooterLegal from "./FooterLegal";
import EventFooter from "../Medias/EventFooter";

const Footer = () => {
  return (
    <footer className="bg-ink text-white">
      <Wrapper
        styles="hidden justify-between border-t border-white/10 py-[80px]
    lg:flex"
      >
        <FooterAbout />
        <FooterCompany />
        <FooterServices />
        {/* <FooterLegal /> */}
        <EventFooter />
      </Wrapper>
    </footer>
  );
};

export default Footer;
