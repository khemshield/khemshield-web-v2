import type { Metadata } from "next";
import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import HeaderContent from "@/app/components/Generics/HeaderContent";
import Wrapper from "@/app/components/Generics/Wrapper";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import Courses from "./Courses";
import { getCourses } from "./course.api";

export const metadata: Metadata = {
  title: "Training Programs",
  description:
    "Build real skills in cybersecurity and AI with Khemshield's hands-on training programs, from threat defense to building AI-powered and agentic systems.",
  alternates: { canonical: "/training" },
};

const TraininPage = async () => {
  const courses = await getCourses();

  return (
    <section>
      <Breadcrumb crumbs={[{ href: "", text: "Training Program" }]} />
      <Wrapper>
        <ContentSpacing />
        <HeaderContent
          heading="Build Real Skills in Security & AI"
          center
        >
          At Khemshield, we believe the key to staying ahead in a fast-moving
          tech industry is continuous, hands-on learning. Our training programs
          equip students, professionals, and organizations with the practical
          skills to excel in cybersecurity and artificial intelligence, from
          threat defense to building AI-powered and agentic systems.
        </HeaderContent>
        <ContentSpacing />
        <Courses allCourses={courses} />
      </Wrapper>
    </section>
  );
};

export default TraininPage;
