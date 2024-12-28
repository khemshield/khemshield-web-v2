import Heading from "@/app/components/Generics/Heading";
import BaseSpacing from "@/app/components/Spacing/BaseSpacing";
import { IoMdAlarm } from "react-icons/io";

const CoursePricing = () => {
  return (
    <section className="px-4">
      <div className=" flex justify-between">
        <div className="flex items-center gap-3">
          <Heading variant="h3">₦200,000</Heading>
          <del>₦250,000</del>
        </div>
        <div className=" text-primary-normal">20% off</div>
      </div>
      <BaseSpacing />
      <div className="flex items-center gap-2 text-primary-normal">
        <IoMdAlarm size={24} />
        <span>7 days left at this price!</span>
      </div>
    </section>
  );
};

export default CoursePricing;
