import React from "react";
import Wrapper from "../Generics/Wrapper";
import FooterAbout from "./FooterAbout";
import FooterCompany from "./FooterCompany";
import FooterServices from "./FooterServices";
import FooterLegal from "./FooterLegal";
import EventFooter from "../Medias/EventFooter";

const Footer = () => {
  return (
    <Wrapper
      styles="hidden justify-between border-t py-[80px] 
    lg:flex"
    >
      <FooterAbout />
      <FooterCompany />
      <FooterServices />
      {/* <FooterLegal /> */}
      <EventFooter />
    </Wrapper>
  );
};

export default Footer;
