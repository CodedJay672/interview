import type { HourlyEntry } from "../App";
import WeatherThumbnail from "./weatherThumbnail";

const HourlyWeatherDisplay: React.FC<{ hourlyData: HourlyEntry[] }> = ({
  hourlyData,
}) => (
  <div className="w-full flex items-center gap-3 pb-3 overflow-x-scroll no-scrollbar">
    {hourlyData.map((entry, index) => (
      <WeatherThumbnail
        key={index}
        time={entry.time}
        temperature={entry.temperature}
      />
    ))}
  </div>
);

export default HourlyWeatherDisplay;
