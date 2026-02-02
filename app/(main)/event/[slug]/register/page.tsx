import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import SectionSpacing from "@/app/components/Spacing/SectionSpacing";
import EventRegisterForm from "./EventRegisterForm";
import { Metadata } from "next";
import { eventSlug } from "../../eventSlug";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title:
    "Register for Empowerment Series 2024: Advance Your Cybersecurity and Software Engineering Skills",
  description: `Join the Empowerment Series 2024, a two-week training event by Khemshield and Jidem Foundation. Gain practical skills in cybersecurity and software engineering to excel in remote work environments. Secure your spot today!`,
  openGraph: {
    title:
      "Register for Empowerment Series 2024: Advance Your Cybersecurity and Software Engineering Skills",
    description: `Join the Empowerment Series 2024, a two-week training event by Khemshield and Jidem Foundation. Gain practical skills in cybersecurity and software engineering to excel in remote work environments. Secure your spot today!`,
    type: "website",
    images: [
      {
        url: "/assets/images/events/khemshield_jidem.jpg", // Make sure the path is correct
        width: 800,
        height: 600,
        alt: "Khemshield Events Image",
      },
    ],
  },
  twitter: {
    title:
      "Register for Empowerment Series 2024: Advance Your Cybersecurity and Software Engineering Skills",
    description: `Join the Empowerment Series 2024, a two-week training event by Khemshield and Jidem Foundation. Gain practical skills in cybersecurity and software engineering to excel in remote work environments. Secure your spot today!`,
    images: ["/assets/images/events/khemshield_jidem.jpg"], // Path to the image
  },
};

const EventRegistrationPage = () => {
  const eventEnded = true;

  if (eventEnded) {
    return notFound();
  }

  return (
    <section>
      <Breadcrumb
        crumbs={[
          {
            text: "Event",
            href: "/event",
          },
          {
            text: "Web Development and Cybersecurity",
            href: `/event/${eventSlug}`,
          },
          {
            text: "Register",
            href: "",
          },
        ]}
        heading=""
      />
      <SectionSpacing />
      <section className=" max-w-[620px] m-auto px-4">
        <EventRegisterForm />
      </section>
    </section>
  );
};

export default EventRegistrationPage;
