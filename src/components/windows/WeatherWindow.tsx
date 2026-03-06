import { useQuery } from "@tanstack/react-query";
import {
  getCurrentWeatherByCity,
  getForecastByCity,
} from "../../services/services";
import WindowWrapper from "../WindowWrapper";
import type {
  CurrentWeather,
  ForecastItem,
  ForecastResponse,
} from "../../types";

function iconToEmoji(icon: string): string {
  const map: Record<string, string> = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "🌤️",
    "03d": "⛅",
    "03n": "⛅",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌦️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return map[icon] ?? "🌡️";
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatHour = (dtTxt: string): string => {
  const date = new Date(dtTxt.replace(" ", "T"));
  return `${date.getHours()}:00`;
};

const getDayLabel = (dtTxt: string, index: number): string => {
  if (index === 0) return "Today";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dtTxt.replace(" ", "T")).getDay()];
};

const buildDailyForecast = (list: ForecastItem[]) => {
  const days: Record<
    string,
    { min: number; max: number; dayIcons: string[]; label: string }
  > = {};
  let dayIndex = 0;

  list.forEach((item) => {
    const dateKey = item.dt_txt.split(" ")[0];
    if (!days[dateKey]) {
      days[dateKey] = {
        min: item.main.temp_min,
        max: item.main.temp_max,
        dayIcons: [],
        label: getDayLabel(item.dt_txt, dayIndex++),
      };
    }
    days[dateKey].min = Math.min(days[dateKey].min, item.main.temp_min);
    days[dateKey].max = Math.max(days[dateKey].max, item.main.temp_max);
    if (item.sys.pod === "d") {
      days[dateKey].dayIcons.push(item.weather[0].icon);
    }
  });

  return Object.values(days).map((d) => ({
    label: d.label,
    low: Math.round(d.min),
    high: Math.round(d.max),
    icon: iconToEmoji(d.dayIcons[Math.floor(d.dayIcons.length / 2)] ?? "01d"),
  }));
};

type WeatherWindowProps = {
  onClose: () => void;
};

const WeatherWindow = ({ onClose }: WeatherWindowProps) => {
  const { data: current, isLoading: loadingCurrent } = useQuery<CurrentWeather>(
    {
      queryKey: ["weather", "current"],
      queryFn: () => getCurrentWeatherByCity("zagreb"),
    },
  );

  const { data: forecast, isLoading: loadingForecast } =
    useQuery<ForecastResponse>({
      queryKey: ["weather", "forecast"],
      queryFn: () => getForecastByCity("zagreb"),
    });

  const isLoading = loadingCurrent || loadingForecast;

  const city = current?.name ?? "—";
  const temp = current ? Math.round(current.main.temp) : null;
  const tempMin = current ? Math.round(current.main.temp_min) : null;
  const tempMax = current ? Math.round(current.main.temp_max) : null;
  const condition = current ? capitalize(current.weather[0].description) : "—";
  const humidity = current?.main.humidity ?? null;
  const windSpeed = current ? Math.round(current.wind.speed * 3.6) : null; // m/s → km/h
  const cloudiness = current?.clouds.all ?? null;

  const hourlyItems = (forecast?.list ?? []).slice(0, 8).map((item, i) => ({
    time: i === 0 ? "Now" : formatHour(item.dt_txt),
    icon: iconToEmoji(item.weather[0].icon),
    temp: Math.round(item.main.temp),
  }));

  const dailyItems = forecast ? buildDailyForecast(forecast.list) : [];
  const globalMin = dailyItems.length
    ? Math.min(...dailyItems.map((d) => d.low))
    : 0;
  const globalMax = dailyItems.length
    ? Math.max(...dailyItems.map((d) => d.high))
    : 1;

  return (
    <WindowWrapper onClose={onClose} disableResizing>
      <div className="w-weather">
        {isLoading ? (
          <div className="w-weather__loading">
            <span>Loading…</span>
          </div>
        ) : (
          <>
            <div className="w-weather__hero">
              <p className="w-weather__hero_city">{city}</p>
              <p className="w-weather__hero_temperature">{temp}°</p>
              <p className="w-weather__hero_condition">{condition}</p>
              <p className="w-weather__hero_highLowTemp">
                H:{tempMax}°&nbsp;&nbsp;L:{tempMin}°
              </p>
            </div>

            <div className="w-weather__panels">
              {hourlyItems.length > 0 && (
                <div className="w-weather__panels_panel w-weather__panels_panel--hourly">
                  {hourlyItems.map((h, i) => (
                    <div key={i}>
                      <span>{h.time}</span>
                      <span>{h.icon}</span>
                      <span>{h.temp}°</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="w-weather__panels_row">
                {dailyItems.length > 0 && (
                  <div className="w-weather__panels_panel w-weather__panels_panel--forecast">
                    <header>
                      <span>📅</span>
                      <span>5-DAY FORECAST</span>
                    </header>
                    <hr />
                    {dailyItems.map((d, i) => {
                      const rangeWidth = globalMax - globalMin || 1;
                      const barStart = ((d.low - globalMin) / rangeWidth) * 100;
                      const barWidth = ((d.high - d.low) / rangeWidth) * 100;
                      return (
                        <div key={i}>
                          <span>{d.label}</span>
                          <span>{d.icon}</span>
                          <span>{d.low}°</span>
                          <div>
                            <div
                              style={{
                                left: `${barStart}%`,
                                width: `${barWidth}%`,
                              }}
                            />
                          </div>
                          <span>{d.high}°</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="w-weather__panels_side">
                  <div className="w-weather__panels_panel w-weather__panels_panel--conditions">
                    <header>
                      <span>🌡️</span>
                      <span>CONDITIONS</span>
                    </header>
                    <hr />
                    <div>
                      {humidity !== null && (
                        <div>
                          <span>💧 Humidity</span>
                          <span>{humidity}%</span>
                        </div>
                      )}
                      {windSpeed !== null && (
                        <div>
                          <span>💨 Wind</span>
                          <span>{windSpeed} km/h</span>
                        </div>
                      )}
                      {cloudiness !== null && (
                        <div>
                          <span>☁️ Cloud cover</span>
                          <span>{cloudiness}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </WindowWrapper>
  );
};

export default WeatherWindow;
