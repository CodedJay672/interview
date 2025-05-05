import { TiWeatherWindyCloudy } from "react-icons/ti";

const WeatherThumbnail = ({
  time,
  temperature,
}: {
  time: string;
  temperature: number;
}) => {
  return (
    <article className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] p-3 space-y-3 rounded-lg border border-accent flex justify-center items-center flex-col">
      <TiWeatherWindyCloudy size={40} className="text-accent" />
      <p className="font-light text-sm text-accent">{time}</p>
      <p className="text-accent font-bold text-base">{temperature}°C</p>;
    </article>
  );
};

export default WeatherThumbnail;
