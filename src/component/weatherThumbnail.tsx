import { TiWeatherWindyCloudy } from "react-icons/ti";

const WeatherThumbnail = ({
  time,
  temperature,
  currentTime,
}: {
  time: string;
  temperature: number;
  currentTime: string;
}) => {
  return (
    <article
      className={`flex-shrink-0 flex items-center gap-2 w-[calc(100%-15rem)] md:w-[calc(100%-40rem)] border border-accent p-4  rounded-xl ${
        currentTime === time && "bg-accent"
      }`}
    >
      <TiWeatherWindyCloudy size={40} className="text-accent" />
      <div>
        <p className="w-full text-center font-light text-sm text-accent">
          {time}
        </p>
        <p className="w-full text-center text-accent font-bold text-base">
          {temperature}°C
        </p>
      </div>
    </article>
  );
};

export default WeatherThumbnail;
