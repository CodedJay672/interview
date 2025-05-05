import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherByWeekday from "./component/WeatherInfoCard";
import WeatherThumbnail from "./component/weatherThumbnail";

type HourlyData = {
  time: string[];
  temperature_2m: number[];
};

type HourlyEntry = {
  time: string;
  temperature: number;
};

export type DaysMap = {
  [day: string]: {
    hourly: HourlyEntry[];
    currentHourTemp?: number;
  };
};

const weekdays: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const App: React.FC = () => {
  const [daysMap, setDaysMap] = useState<DaysMap>({});
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&hourly=temperature_2m"
      );

      if (!response.status) return;

      const data = response.data;
      const mapped = mapWeatherData(data.hourly);
      setDaysMap(mapped);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const mapWeatherData = (hourly: HourlyData): DaysMap => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const currentHour = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const mapped: DaysMap = {};

    hourly.time.forEach((iso: string, index: number) => {
      const { day, hour } = extractDayAndHour(iso);

      if (!weekdays.includes(day)) return;

      if (!mapped[day]) mapped[day] = { hourly: [] };

      const entry = { time: hour, temperature: hourly.temperature_2m[index] };
      mapped[day].hourly.push(entry);

      if (day === currentDay && hour === currentHour) {
        mapped[day].currentHourTemp = hourly.temperature_2m[index];
      }
    });

    return mapped;
  };

  const extractDayAndHour = (
    isoString: string
  ): { day: string; hour: string } => {
    const date = new Date(isoString);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const hour = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { day, hour };
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <section className="w-full max-w-3xl space-y-4 mx-auto px-4 flex-1">
      <WeekdaySelector
        weekdays={weekdays}
        selectedDay={selectedDay}
        daysMap={daysMap}
        onDaySelect={setSelectedDay}
      />
      <HourlyWeatherDisplay hourlyData={daysMap[selectedDay]?.hourly || []} />
    </section>
  );
};

const WeekdaySelector: React.FC<{
  weekdays: string[];
  selectedDay: string;
  daysMap: DaysMap;
  onDaySelect: (day: string) => void;
}> = ({ weekdays, selectedDay, daysMap, onDaySelect }) => {
  return (
    <div className="w-full flex items-center gap-4 py-10 overflow-x-scroll no-scrollbar">
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

export default App;
