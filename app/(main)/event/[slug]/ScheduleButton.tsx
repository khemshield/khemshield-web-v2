import { MedalStar } from "iconsax-react";

interface Props {
  day: string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
}
const ScheduleButton = ({ day, date, isActive, onClick }: Readonly<Props>) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive ? " bg-primary-normal" : "bg-primary-normal/5"
      } flex gap-4 py-4 px-6 min-w-full lg:min-w-[25%]
      rounded-lg' scroll-snap-align-start`}
    >
      <MedalStar
        size={42}
        className={`${isActive ? "text-white" : "text-primary-normal"}`}
      />
      <div className={`${isActive && "text-white"} text-left`}>
        <h4 className="text-xl xl:text-2xl">{day}</h4>
        <p className=" text-xs">{date}</p>
      </div>
    </button>
  );
};

export default ScheduleButton;
