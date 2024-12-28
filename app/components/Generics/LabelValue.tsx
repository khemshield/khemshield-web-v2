import { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  icon?: ReactNode;
}

const LabelValue = ({ label, value, icon }: Readonly<Props>) => {
  return (
    <div className=" flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div>{value}</div>
    </div>
  );
};

export default LabelValue;
