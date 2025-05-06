import { TiWeatherWindyCloudy } from "react-icons/ti";

const WeatherByWeekday = ({
  currentDay,
  day,
  temp,
  action,
}: {
  currentDay: string;
  day: string;
  temp?: number;
  action: () => void;
}) => {
  return (
    <article
      onClick={action}
      className={`w-full cursor-pointer p-6 rounded-xl flex justify-between items-center gap-10 ${
        currentDay === day ? "bg-accent" : "bg-gray-600/50"
      }`}
    >
      <div>
        <p className="font-bold text-white transition-all">{day}</p>
      </div>

      <div className="relative flex">
        <h1 className="text-3xl lg:text-6xl text-white">{temp}°C</h1>
      </div>

      <TiWeatherWindyCloudy size={64} color="white" />
    </article>
  );
};

export default WeatherByWeekday;
