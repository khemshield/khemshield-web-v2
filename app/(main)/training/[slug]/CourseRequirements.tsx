import Dot from "@/app/components/Generics/Dot";
import Heading from "@/app/components/Generics/Heading";
import ListItem from "@/app/components/Generics/ListItem";

const courseRequirements = [
  "No requirements. We teach you and show you everything from scratch! From Zero to Mastery",
  "Get ready to fall in love with Design and making everything you touch into beautiful projects for the rest of your life!",
];
const CourseRequirements = () => {
  return (
    <section>
      <Heading variant="h3">Course requirements</Heading>
      <ul>
        {courseRequirements.map((courseRequirement) => (
          <ListItem key={courseRequirement} icon={<Dot />} center>
            {courseRequirement}
          </ListItem>
        ))}
      </ul>
    </section>
  );
};

export default CourseRequirements;
