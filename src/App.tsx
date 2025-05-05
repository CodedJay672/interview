import axios from "axios";
import React, { useEffect, useState } from "react";
import WeekdaySelector from "./component/WeekdaySelector";
import HourlyWeatherDisplay from "./component/HourlyWeatherDisplay";
import { mapWeatherData } from "./libs/utils";
import { weekdays } from "./constant";

export type HourlyEntry = {
  time: string;
  temperature: number;
};

export type DaysMap = {
  [day: string]: {
    hourly: HourlyEntry[];
  };
};

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

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <section className="w-full max-w-3xl space-y-4 mx-auto px-10 min-h-[calc(100vh-200px)]">
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

export default App;
