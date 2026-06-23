import type { Metadata } from "next";
import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import React from "react";
import FAQs from "./FAQs";
import Wrapper from "@/app/components/Generics/Wrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about Khemshield's IT services, training programs, and how to get started.",
  alternates: { canonical: "/faq" },
};

const FAQPage = () => {
  return (
    <section>
      <Breadcrumb crumbs={[{ href: "", text: "FAQs" }]} />
      <ContentSpacing />
      <Wrapper>
        <FAQs />
        <ContentSpacing />
        <p className=" text-center">
          Do you have any other questions, comments, or complaints?{" "}
          <Link href="/contact" className=" text-primary-normal font-semibold">
            Contact Us
          </Link>
        </p>
      </Wrapper>
    </section>
  );
};

export default FAQPage;
