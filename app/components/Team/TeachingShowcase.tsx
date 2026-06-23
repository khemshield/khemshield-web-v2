import Wrapper from "../Generics/Wrapper";
import Heading from "../Generics/Heading";
import Text from "../Generics/Text";
import Button from "../Buttons/Button";
import VideoPlayer from "../Medias/VideoPlayer";

const TeachingShowcase = () => {
  return (
    <Wrapper>
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary-normal">
            Inside the classroom
          </p>
          <div className="mt-4">
            <Heading variant="h2">Learn from people who do the work</Heading>
          </div>
          <Text styles="mt-5 max-w-[48ch]">
            Our training isn&apos;t slides and theory. You learn hands-on from
            practitioners who defend systems and ship secure software every day, the same people teaching you to do it. Watch a moment from a real
            session.
          </Text>
          <div className="mt-7">
            <Button elementType="link" href="/training" variant="primary">
              Explore training &rarr;
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <VideoPlayer />
        </div>
      </div>
    </Wrapper>
  );
};

export default TeachingShowcase;
