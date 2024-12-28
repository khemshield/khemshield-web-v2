import Text from "@/app/components/Generics/Text";
import StackedImages from "../../event/StackedImages";

import abdulkareem from "@/public/assets/images/events/abdulkareem.png";
import felix from "@/public/assets/images/events/felix.png";
import Dot from "../../../components/Generics/Dot";

const CourseCreatedBy = () => {
  return (
    <section className=" flex gap-3 items-center">
      <StackedImages
        images={[
          { src: abdulkareem, alt: "" },
          { src: felix, alt: "" },
        ]}
      />

      <div>
        <h6 className=" text-primary-normal">Created by:</h6>
        <div className=" font-semibold flex gap-2 items-center text-secondary-normal">
          <p>Abdulkareem Adamu</p> <Dot /> <p>Felix Fomengia</p>
        </div>
      </div>
    </section>
  );
};

export default CourseCreatedBy;
