import type { Metadata } from "next";
import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import Wrapper from "@/app/components/Generics/Wrapper";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import WhoWeAre from "./WhoWeAre";
import OurMission from "./OurMission";
import OurTeam from "@/app/components/Team/OurTeam";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn who we are at Khemshield, our mission, and the team behind our secure IT solutions and tech training programs.",
  alternates: { canonical: "/about" },
};

const AboutPage = () => {
  return (
    <section>
      <Breadcrumb crumbs={[{ href: "", text: "About" }]} />
      <ContentSpacing />
      <Wrapper>
        <WhoWeAre />
        <ContentSpacing />
        <OurMission />
        <ContentSpacing />
        <OurTeam />
      </Wrapper>
      <ContentSpacing />
    </section>
  );
};

export default AboutPage;
