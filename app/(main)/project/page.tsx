import type { Metadata } from "next";
import Heading from "@/app/components/Generics/Heading";
import Wrapper from "@/app/components/Generics/Wrapper";

export const metadata: Metadata = {
  title: "Projects",
  description: "Khemshield projects, coming soon.",
  robots: { index: false, follow: true },
};

const ProjectPage = () => {
  return (
    <Wrapper>
      I understand your expectation is{" "}
      <span className="text-primary-normal">HIGH</span>
      <Heading variant="h4">ANTICIPATE PROJECTS!!!</Heading>
    </Wrapper>
  );
};

export default ProjectPage;
