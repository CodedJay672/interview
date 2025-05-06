import type { DaysMap } from "../App";
import WeatherByWeekday from "./WeatherInfoCard";

const WeekdaySelector: React.FC<{
  weekdays: string[];
  selectedDay: string;
  daysMap: DaysMap;
  onDaySelect: (day: string) => void;
}> = ({ weekdays, selectedDay, daysMap, onDaySelect }) => {
  return (
    <div className="w-full  lg:hidden flex flex-col gap-3 no-scrollbar overflow-x-auto mx-auto mt-10">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">This week</h2>
      </div>
      {weekdays.map((day) => (
        <WeatherByWeekday
          key={day}
          currentDay={selectedDay}
          day={day}
          temp={
            daysMap[day]?.hourly.find((entry) => entry.time === "00:00")
              ?.temperature
          }
          action={() => onDaySelect(day)}
        />
      ))}
    </div>
  );
};

export default WeekdaySelector;
