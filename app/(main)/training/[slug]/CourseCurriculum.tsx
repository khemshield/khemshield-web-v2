import Heading from "@/app/components/Generics/Heading";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import Curriculum from "./Curriculum";

const CourseCurriculum = () => {
  return (
    <section>
      <Heading variant="h3">Curriculum</Heading>
      <BaseSpacing />
      <Curriculum />
      <Curriculum />
    </section>
  );
};

export default CourseCurriculum;
