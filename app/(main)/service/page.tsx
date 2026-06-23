import type { Metadata } from "next";
import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import HeaderContent from "@/app/components/Generics/HeaderContent";
import Wrapper from "@/app/components/Generics/Wrapper";
import Services from "@/app/components/OurServices/Services";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import React from "react";
import HowToGetStarted from "./HowToGetStarted";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Khemshield's IT services: secure application development, cybersecurity consulting, infrastructure protection, and professional training.",
  alternates: { canonical: "/service" },
};

const ServicePage = () => {
  return (
    <section>
      <Breadcrumb
        crumbs={[{ href: "", text: "Services" }]}
        heading="Our Services"
      />
      <ContentSpacing />
      <Wrapper>
        <HeaderContent
          heading="Comprehensive IT Solutions for Your Business and Career"
          center
        >
          At khemshield, we offer a full range of IT services designed to
          protect your business and empower your growth. From secure application
          development to expert cybersecurity consulting and professional
          training programs, we provide everything you need to thrive in the
          digital world.
        </HeaderContent>
        <ContentSpacing />
        <Services />
        <ContentSpacing />
        <HowToGetStarted />
      </Wrapper>
    </section>
  );
};

export default ServicePage;
