import { SelectHTMLAttributes } from "react";

type OptionType = {
  value: string;
  label: string;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionType[];
}

const SelectInput = ({ options, ...rest }: Props) => {
  return (
    <div className="min-w-full">
      <select
        {...rest}
        className=" border border-secondary-normal h-12  w-full 
      rounded-lg text-secondary-normal px-4"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
