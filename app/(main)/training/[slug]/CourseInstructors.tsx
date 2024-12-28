import Heading from "@/app/components/Generics/Heading";

import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import CourseInstructor from "./CourseInstructor";

import abdulkareem from "@/public/assets/images/events/abdulkareem.png";
import felix from "@/public/assets/images/events/felix.png";

const instructors = [
  {
    name: "Abdulkareem Adamu",
    image: abdulkareem,
    description: `I'm an entrepreneur & designer with a high passion for building
            products of all sorts and seeing ideas come to life. As a serial
            entrepreneur, I've designed and built projects in fields ranging
            from fashion to technology. I have over 10 years of experience in
            both...`,
  },
  {
    name: "Felix Fomengia",
    image: felix,
    description: `I'm an entrepreneur & designer with a high passion for building
            products of all sorts and seeing ideas come to life. As a serial
            entrepreneur, I've designed and built projects in fields ranging
            from fashion to technology. I have over 10 years of experience in
            both...`,
  },
];

const CourseInstructors = () => {
  return (
    <div>
      <Heading variant="h4">Course instructor</Heading>
      <ContentSpacing />
      <section>
        {instructors.map(({ image, name, description }) => (
          <article key={name} className=" mb-8">
            <CourseInstructor
              instructor={{
                image: image,
                name: name,
                description: description,
              }}
            />
          </article>
        ))}
      </section>
    </div>
  );
};

export default CourseInstructors;
