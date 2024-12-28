import LabelValue from "@/app/components/Generics/LabelValue";
import { Profile2User } from "iconsax-react";
import { FiBarChart } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { PiNotebook } from "react-icons/pi";

const offerings = [
  { label: "Course Duration", value: "6 Weeks", icon: <IoMdTime size={24} /> },
  {
    label: "Course Level",
    value: "Beginner and Intermediate",
    icon: <FiBarChart size={24} />,
  },
  {
    label: "Students Enrolled",
    value: "69,419,618",
    icon: <Profile2User size={24} />,
  },
  { label: "Language", value: "English", icon: <PiNotebook size={24} /> },
];

const CourseOffering = () => {
  return (
    <ul className="px-4">
      {offerings.map(({ label, value, icon }) => (
        <li key={label} className="my-4">
          <LabelValue label={label} value={value} icon={icon} />
        </li>
      ))}
    </ul>
  );
};

export default CourseOffering;
