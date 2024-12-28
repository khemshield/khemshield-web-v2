import Breadcrumb from "@/app/components/Generics/Breadcrumb";
import Wrapper from "@/app/components/Generics/Wrapper";
import SectionSpacing from "@/app/components/Spacing/SectionSpacing";
import CourseThumbnailTrailerOffer from "./CourseThumbnailTrailerOffer";

import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import CourseDescriptionInstructors from "./CourseDescriptionInstructors";

const TrainingDetailPage = () => {
  return (
    <div>
      <Breadcrumb
        crumbs={[
          { href: "/training", text: "Training Program" },
          { href: "/training/detail", text: "UI/UX Design" },
        ]}
        heading="UI/UX Design"
      />
      <SectionSpacing />
      <Wrapper>
        <CourseThumbnailTrailerOffer />
        <BaseSpacing />
        <CourseDescriptionInstructors />
      </Wrapper>
    </div>
  );
};

export default TrainingDetailPage;
