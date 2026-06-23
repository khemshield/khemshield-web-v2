import CircledListItem from "@/app/components/WhyChooseUs/CircledListItem";
import Image from "next/image";

import how_it_works from "@/public/assets/images/how_it_works.jpg";
import Button from "@/app/components/Buttons/Button";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";

const howItWorks = [
  {
    title: "Submit Your Request",
    description:
      "Fill out the form with details about your project or training requirements. Provide as much information as possible so we can understand your needs and deliver an accurate quote.",
  },
  {
    title: "Receive a Tailored Quote",
    description:
      "Our team will review your request and craft a customized quote. This will include a detailed breakdown of the services we recommend, pricing, and timelines, everything you need to make an informed decision.",
  },
  {
    title: "Consult with Our Experts",
    description:
      "Once you receive your quote, we’ll set up a time to discuss the details. This is your opportunity to ask questions, make adjustments, and ensure the proposal aligns with your vision.",
  },
  {
    title: "Start Your Project or Training",
    description:
      "After finalizing the quote, we’ll kick off your project or set up your training program. Throughout the process, we’ll keep you informed and involved, ensuring everything meets your expectations.",
  },
];
const HowItWorks = () => {
  return (
    <section>
      <div
        className="flex flex-col gap-4 
      lg:flex-row"
      >
        <ul>
          {howItWorks.map((how, i) => (
            <CircledListItem key={how.title} heading={how.title} number={i + 1}>
              {how.description}
            </CircledListItem>
          ))}
        </ul>

        <div
          className="max-h-[500px] -order-1
        lg:min-w-[50%] lg:order-1"
        >
          <Image
            src={how_it_works}
            alt="How it Works"
            className=" object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
      <ContentSpacing />
      <div className="flex items-center justify-center">
        <Button variant="primary" elementType="link" href="/request/new">
          Proceed to requesting a quote
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
