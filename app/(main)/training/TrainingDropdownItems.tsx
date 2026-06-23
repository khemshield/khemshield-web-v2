import React from "react";
import DropdownMenu from "../../components/Menus/DropdownMenu";

const items = [
  "All Courses",
  "Cybersecurity",
  "AI",
  "Development",
  "Programming",
  "Infrastructure",
];

interface Props {
  onSelectItem: (selectedItem: string) => void;
}
const TrainingDropdownItems = ({ onSelectItem }: Readonly<Props>) => {
  return <DropdownMenu items={items} onSelectItem={onSelectItem} />;
};

export default TrainingDropdownItems;
