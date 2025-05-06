import axios from "axios";
import React, { useEffect, useState } from "react";
import WeekdaySelector from "./component/WeekdaySelector";
import HourlyWeatherDisplay from "./component/HourlyWeatherDisplay";
import { extractDayAndHour, mapWeatherData } from "./libs/utils";
import { weekdays } from "./constant";
import Footer from "./component/Footer";
import Header from "./component/Header";

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

  const [today, setToday] = useState<string>("");

  const fetchWeather = async () => {
    try {
      const now = new Date();

      const { day } = extractDayAndHour(now.toISOString());

      setToday(day);

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
    <div className="content-wrapper min-h-screen">
      <Header />
      <main className="w-full max-w-screen-md mx-auto flex flex-col gap-3 overflow-hidden">
        <HourlyWeatherDisplay hourlyData={daysMap[today]?.hourly || []} />

        <WeekdaySelector
          weekdays={weekdays}
          selectedDay={today}
          daysMap={daysMap}
          onDaySelect={setToday}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
