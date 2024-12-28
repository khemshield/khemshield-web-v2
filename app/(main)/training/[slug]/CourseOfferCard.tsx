import Button from "@/app/components/Buttons/Button";
import Card from "@/app/components/Cards/Card";
import HR from "@/app/components/Generics/HR";
import SelectInput from "@/app/components/Inputs/SelectInput";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import NormSpacing from "@/app/components/Spacing/NormSpacing";
import CourseOffering from "./CourseOffering";
import CoursePricing from "./CoursePricing";

const CourseOfferCard = () => {
  return (
    <Card>
      <article className="py-6">
        <CoursePricing />
        <NormSpacing />
        <HR />
        <NormSpacing />
        <CourseOffering />
        <NormSpacing />
        <section className="px-4">
          <div className=" font-semibold">Learning Method</div>
          <BaseSpacing />
          <SelectInput
            options={[
              { value: "In-Person", label: "In-Person" },
              { value: "Virtual", label: "Virtual" },
              { value: "Hybrid", label: "Hybrid" },
            ]}
          />
          <NormSpacing />
          <Button variant="primary" full>
            Enroll Now
          </Button>
        </section>
      </article>
    </Card>
  );
};

export default CourseOfferCard;
