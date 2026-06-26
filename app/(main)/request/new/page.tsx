import HeaderContent from "@/app/components/Generics/HeaderContent";
import type { Metadata } from "next";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import RequestForm from "./RequestForm";

export const metadata: Metadata = {
  title: "Start Your Request",
  description:
    "Tell Khemshield about your project and we will get back to you with a personalized quote tailored to your needs.",
  robots: { index: false, follow: true },
};

const page = () => {
  return (
    <>
      <HeaderContent heading="Let’s Start Building Your Solution" center>
        Complete the form below, and we&apos;ll get back to you shortly with a
        personalized quote tailored to your needs.
      </HeaderContent>
      <ContentSpacing />
      <section className="m-auto flex justify-center lg:w-[80%]">
        <RequestForm />
      </section>
    </>
  );
};

export default page;
