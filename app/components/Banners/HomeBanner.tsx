import Button from "../Buttons/Button";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import VideoPlayer from "../Medias/VideoPlayer";
import BaseSpacing from "../Spacing/BaseSpacing";

const HomeBanner = () => {
  return (
    <section
      className="flex flex-col justify-between gap-24
    lg:flex-row"
    >
      <section className="lg:w-1/2 lg:pr-6">
        <p className=" text-primary-normal font-semibold">
          Cybersecurity &amp; AI
        </p>
        <BaseSpacing />
        <Heading variant="h2">
          The AI era needs builders and defenders. We&apos;re both.
        </Heading>
        <Text styles="my-6">
          KhemShield protects businesses, builds secure web, mobile, and
          AI-powered software on solid cloud foundations, and trains the people
          who&apos;ll do the same. Whether you need systems defended,
          applications built, or a team skilled up, you start here.
        </Text>
        <div className="flex flex-col xs:flex-row items-center gap-4">
          <Button
            elementType="link"
            href="/request"
            variant="primary"
            styles="text-xs md:text-sm lg:text-base py-4 lg:py-2"
          >
            Get a consultation
          </Button>

          <Button
            elementType="link"
            href="/training"
            variant="border"
            styles="text-xs md:text-sm lg:text-base py-4 lg:py-2"
          >
            Explore training
          </Button>
        </div>
      </section>
      <VideoPlayer />
    </section>
  );
};

export default HomeBanner;
