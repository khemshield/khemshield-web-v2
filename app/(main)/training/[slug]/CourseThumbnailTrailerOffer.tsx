import CourseOfferForm from "./CourseOfferForm";
import CourseThumbnailTrailer from "./CourseThumbnailTrailer";

const CourseThumbnailTrailerOffer = () => {
  return (
    <section
      className="flex flex-col gap-5
      lg:flex-row lg:h-[500px] "
    >
      <div className="lg:w-[65%]">
        <CourseThumbnailTrailer />
      </div>
      <div className="hidden lg:w-[35%] lg:block">
        <CourseOfferForm />
      </div>
    </section>
  );
};

export default CourseThumbnailTrailerOffer;
