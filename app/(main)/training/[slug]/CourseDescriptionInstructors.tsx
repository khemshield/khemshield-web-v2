import Heading from "@/app/components/Generics/Heading";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import CourseCreatedBy from "./CourseCreatedBy";
import CourseInstructors from "./CourseInstructors";
import CourseDescription from "./CourseDescription";

const CourseDescriptionInstructors = () => {
  return (
    <section
      className="flex flex-col gap-5
    lg:flex-row"
    >
      <section className="lg:w-[65%]">
        <CourseDescription />
      </section>
      <section className="lg:w-[35%]">
        <CourseInstructors />
      </section>
    </section>
  );
};

export default CourseDescriptionInstructors;
