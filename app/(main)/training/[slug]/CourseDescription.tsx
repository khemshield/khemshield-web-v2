import ButtonSecondLight from "@/app/components/Buttons/ButtonSecondLight";
import Heading from "@/app/components/Generics/Heading";
import ContentSpacing from "@/app/components/Spacing/ContentSpacing";
import { IoCopyOutline, IoShareSocialOutline } from "react-icons/io5";
import CourseCreatedBy from "./CourseCreatedBy";
import ListItem from "@/app/components/Generics/ListItem";
import { TickCircle } from "iconsax-react";
import CourseCoverage from "./CourseCoverage";
import CourseIsFor from "./CourseIsFor";
import CourseRequirements from "./CourseRequirements";
import CourseCurriculum from "./CourseCurriculum";
import CourseOfferForm from "./CourseOfferForm";
import ShareButton from "@/app/components/Buttons/ShareButton";
import CopyButton from "@/app/components/Buttons/CopyButton";

const CourseDescription = () => {
  return (
    <div>
      <section
        className="flex flex-col justify-between gap-y-8
        lg:flex-row"
      >
        <CourseCreatedBy />
        <div className="flex gap-2 text-secondary-normal">
          <CopyButton />
          <ShareButton />
        </div>
      </section>
      <ContentSpacing />
      <Heading variant="h2">
        Complete Web & Mobile Designer: UI/UX, Figma, +more
      </Heading>
      <ContentSpacing />
      <Heading variant="h4" bold={false}>
        Become a UX/UI Designer! Master Mobile and Web Design, User Interface +
        User Experience (UI/UX Design), HTML, and CSS
      </Heading>
      <ContentSpacing />
      <section className="lg:hidden">
        <CourseOfferForm />
      </section>
      <ContentSpacing />
      <CourseCoverage />
      <ContentSpacing />
      <CourseIsFor />
      <ContentSpacing />
      <CourseRequirements />
      <ContentSpacing />
      <CourseCurriculum />
      <ContentSpacing />
    </div>
  );
};

export default CourseDescription;
