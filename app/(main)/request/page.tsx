import type { Metadata } from "next";
import HeaderContent from "@/app/components/Generics/HeaderContent";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import HowItWorks from "./HowItWorks";

export const metadata: Metadata = {
  title: "Request a Solution",
  description:
    "Request a customized IT solution from Khemshield, from secure application development and cybersecurity consulting to infrastructure protection and training.",
  alternates: { canonical: "/request" },
};

const RequestPage = () => {
  return (
    <>
      <HeaderContent heading="Get Your Customized IT Solution Today" center>
        Whether you&apos;re looking for secure application development, expert
        cybersecurity consulting, robust infrastructure protection, or
        specialized IT training, Khemshield is here to help. Let&apos;s create a
        solution that&apos;s perfectly tailored to your unique needs and goals.
      </HeaderContent>
      <ContentSpacing />
      <HowItWorks />
    </>
  );
};

export default RequestPage;
