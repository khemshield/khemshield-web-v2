import Heading from "@/app/components/Generics/Heading";
import ListItem from "@/app/components/Generics/ListItem";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import { TickCircle } from "iconsax-react";

const coverage = [
  "Build beautifully designed web and mobile projects for your customers using modern tools used by top companies in 2023",
  "Get hired as a Designer or become a freelancer that can work from anywhere and for anyone. Designers are in high demand!",
  "Includes 100+ assets and premium design templates that you can keep and use to customize for all your future projects",
  "Master Figma for your design needs then learn to convert your designs into a live HTML an CSS website",
  "Have an amazing design portfolio customized and professionally completed by the end of the course (we provide it for you!)",
];

const CourseCoverage = () => {
  return (
    <section className=" bg-primary-container px-5 py-10">
      <Heading variant="h3">What you will learn in this course</Heading>
      <BaseSpacing />
      <ul className=" grid lg:grid-cols-2 lg:gap-4">
        {coverage.map((cov, i) => (
          <ListItem
            key={i}
            icon={
              <TickCircle
                size="24"
                variant="Bold"
                className=" text-primary-normal"
              />
            }
          >
            {cov}
          </ListItem>
        ))}
      </ul>
    </section>
  );
};

export default CourseCoverage;
