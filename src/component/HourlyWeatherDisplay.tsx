import type { HourlyEntry } from "../App";
import { extractDayAndHour } from "../libs/utils";
import WeatherThumbnail from "./weatherThumbnail";

const HourlyWeatherDisplay: React.FC<{ hourlyData: HourlyEntry[] }> = ({
  hourlyData,
}) => {
  const today = extractDayAndHour(new Date().toISOString());
  return (
    <>
      <div className="w-full py-4 flex justify-between items-center">
        <h2 className="text-lg text-white font-medium">Today</h2>
        <div className="space-y-1">
          <span className="text-sm text-white ">{today.day}</span>{" "}
          <span className="text-sm text-white ">{today.hour}</span>
        </div>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-4 mb-6">
        {hourlyData.map((entry, index) => (
          <WeatherThumbnail
            key={index}
            currentTime={today.hour}
            time={entry.time}
            temperature={entry.temperature}
          />
        ))}
      </div>
    </>
  );
};

export default HourlyWeatherDisplay;
