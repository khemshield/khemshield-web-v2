import type { Metadata } from "next";
import Heading from "@/app/components/Generics/Heading";
import Wrapper from "@/app/components/Generics/Wrapper";
import React from "react";

export const metadata: Metadata = {
  title: "Consultation",
  description: "Khemshield consultation services, coming soon.",
  robots: { index: false, follow: true },
};

const ConsultationPage = () => {
  return (
    <Wrapper>
      I know you need a consutant but hold a little{" "}
      <span className="text-primary-normal">MORE</span>
      <Heading variant="h4">ANTICIPATE CONSULTATION!!!</Heading>
    </Wrapper>
  );
};

export default ConsultationPage;
