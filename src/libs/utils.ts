import type { DaysMap } from "../App";
import { weekdays } from "../constant";

type HourlyData = {
  time: string[];
  temperature_2m: number[];
};

export const mapWeatherData = (hourly: HourlyData): DaysMap => {
  const mapped: DaysMap = {};

  hourly.time.forEach((iso: string, index: number) => {
    const { day, hour } = extractDayAndHour(iso);

    if (!weekdays.includes(day)) return;

    if (!mapped[day]) mapped[day] = { hourly: [] };

    const entry = { time: hour, temperature: hourly.temperature_2m[index] };
    mapped[day].hourly.push(entry);
  });

  return mapped;
};

export const extractDayAndHour = (
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
