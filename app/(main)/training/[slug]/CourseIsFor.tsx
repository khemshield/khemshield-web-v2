import Heading from "@/app/components/Generics/Heading";
import ListItem from "@/app/components/Generics/ListItem";
import { ArrowRight } from "iconsax-react";
import React from "react";

const courseFor = [
  "Anyone who wants to start a Web or Mobile Design business on the side as a freelancer, or work as a designer at a company freelancer, or work as a designer at a company",
  "Web Developers and Mobile Developers wanting to add another valuable skill to their tool belt",
  "Anyone who wants to get hired as a Web Designer, Mobile Designer, UI/UX Designer",
  "Anyone who wants to learn about the latest CSS3 features like Flexbox, CSS Grid and CSS Variables as well as HTML5",
];
const CourseIsFor = () => {
  return (
    <section>
      <Heading variant="h3">Who this course is for:</Heading>
      <ul>
        {courseFor.map((isFor) => (
          <ListItem
            key={isFor}
            center
            icon={<ArrowRight size={24} className=" text-primary-normal" />}
          >
            {isFor}
          </ListItem>
        ))}
      </ul>
    </section>
  );
};

export default CourseIsFor;
