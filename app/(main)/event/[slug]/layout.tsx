import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { eventSlug } from "../eventSlug";

export const metadata: Metadata = {
  title:
    "Empowerment Series 2024: Empowering Warriors with On-Demand Skills for Remote Work - Khemshield & Jidem Foundation",
  description: `Join the Empowerment Series 2024, a collaboration with the Jidem Foundation, designed to enhance your skills in cybersecurity and software engineering for remote work success`,
  openGraph: {
    title:
      "Empowerment Series 2024: Empowering Warriors with On-Demand Skills for Remote Work - Khemshield & Jidem Foundation",
    description: `Join the Empowerment Series 2024, a collaboration with the Jidem Foundation, designed to enhance your skills in cybersecurity and software engineering for remote work success`,
    images: [
      {
        url: "/assets/images/events/khemshield_jidem.jpg", // Make sure the path is correct
        width: 800,
        height: 600,
        alt: "Khemshield Events Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Empowerment Series 2024: Empowering Warriors with On-Demand Skills for Remote Work - Khemshield & Jidem Foundation",
    description: `Join the Empowerment Series 2024, a collaboration with the Jidem Foundation, designed to enhance your skills in cybersecurity and software engineering for remote work success`,
    images: ["/assets/images/events/khemshield_jidem.jpg"], // Path to the image
  },
};

interface Props {
  params: { slug: string };
}
const EventDetailLayout = ({
  children,
  params: { slug },
}: Readonly<PropsWithChildren<Props>>) => {
  const normalizedSlug = slug.toLowerCase();
  const normalizedEventSlug = eventSlug?.toLowerCase(); // Ensure eventSlug is defined

  if (!normalizedEventSlug || normalizedSlug !== normalizedEventSlug) {
    return notFound();
  }

  return <main>{children}</main>;
};

export default EventDetailLayout;
