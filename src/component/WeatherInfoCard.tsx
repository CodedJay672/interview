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
      className={`w-full lg:w-xs cursor-pointer p-6 rounded-xl border transition-all ${
        currentDay === day ? "border-accent" : "border-foreground"
      }`}
    >
      <p
        className={`font-bold text-center transition-all ${
          currentDay === day
            ? "text-accent text-2xl"
            : "text-lg text-foreground"
        }`}
      >
        {day}
      </p>
      <h2
        className={`font-thin text-center mt-8 mb-10 ${
          currentDay === day ? "text-accent font-medium" : "text-foreground"
        }`}
      >
        Feels like
      </h2>

      <div className="relative flex">
        <h1
          className={`text-6xl text-foreground relative top-1 -left-1 transition-all ${
            currentDay === day ? "font-bold" : "font-normal"
          }`}
        >
          {temp}°C
        </h1>
        <h1
          className={`text-6xl absolute -top-1 left-1 z-10 transition-all ${
            currentDay === day
              ? "text-accent opacity-100 font-bold"
              : "opacity-0 font-normal"
          }`}
        >
          {temp}°C
        </h1>
      </div>
    </article>
  );
};

export default WeatherByWeekday;
