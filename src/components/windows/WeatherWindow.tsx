import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useRef } from "react";
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
import { useDebounce } from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

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

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const formatHour = (dtTxt: string): string => {
  const date = new Date(dtTxt.replace(" ", "T"));
  return `${date.getHours()}:00`;
};

type WeatherWindowProps = {
  onClose: () => void;
};

const WeatherWindow = ({ onClose }: WeatherWindowProps) => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedCity = useDebounce(searchInput, 500, "zagreb");

  const trimmedCity = debouncedCity.trim();

  const { data: current, isLoading: loadingCurrent } = useQuery<CurrentWeather>(
    {
      queryKey: ["weather", "current", trimmedCity],
      queryFn: () => getCurrentWeatherByCity(trimmedCity),
      enabled: trimmedCity.length > 0,
      staleTime: 1000 * 60 * 5,
    },
  );

  const { data: forecast, isLoading: loadingForecast } =
    useQuery<ForecastResponse>({
      queryKey: ["weather", "forecast", trimmedCity],
      queryFn: () => getForecastByCity(trimmedCity),
      enabled: trimmedCity.length > 0,
      staleTime: 1000 * 60 * 5,
    });

  const isLoading = loadingCurrent || loadingForecast;

  const city = current?.name ?? "—";
  const temp = current ? Math.round(current.main.temp) : null;
  const tempMin = current ? Math.round(current.main.temp_min) : null;
  const tempMax = current ? Math.round(current.main.temp_max) : null;
  const condition = current ? capitalize(current.weather[0].description) : "—";
  const humidity = current?.main.humidity ?? null;
  const windSpeed = current ? Math.round(current.wind.speed * 3.6) : null;
  const cloudiness = current?.clouds.all ?? null;

  const dayLabels = t("windows.weather.daysShort", {
    returnObjects: true,
  }) as string[];
  const todayLabel = t("windows.weather.today");
  const nowLabel = t("windows.weather.now");

  const getDayLabel = (dtTxt: string, index: number): string => {
    if (index === 0) return todayLabel;
    const dayIndex = new Date(dtTxt.replace(" ", "T")).getDay();
    return dayLabels[dayIndex] ?? dayLabels[0] ?? "";
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

  const hourlyItems = useMemo(
    () =>
      (forecast?.list ?? []).slice(0, 8).map((item, i) => ({
        time: i === 0 ? nowLabel : formatHour(item.dt_txt),
        icon: iconToEmoji(item.weather[0].icon),
        temp: Math.round(item.main.temp),
      })),
    [forecast, nowLabel],
  );

  const dailyItems = useMemo(
    () => (forecast ? buildDailyForecast(forecast.list) : []),
    [forecast, dayLabels, todayLabel],
  );
  const globalMin = useMemo(
    () => (dailyItems.length ? Math.min(...dailyItems.map((d) => d.low)) : 0),
    [dailyItems],
  );
  const globalMax = useMemo(
    () => (dailyItems.length ? Math.max(...dailyItems.map((d) => d.high)) : 1),
    [dailyItems],
  );

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        setSearchInput("");
      }
      return next;
    });
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchInput("");
    }
  };

  return (
    <WindowWrapper windowId="weather" onClose={onClose} disableResizing>
      <div className="w-weather">
        <div
          className={`w-weather__search${isSearchOpen ? " w-weather__search--open" : ""}`}
        >
          <button
            className="w-weather__search_toggle"
            onClick={handleSearchToggle}
            aria-label={
              isSearchOpen
                ? t("windows.weather.closeSearchLabel")
                : t("windows.weather.openSearchLabel")
            }
          >
            {isSearchOpen ? "✕" : "🔍"}
          </button>

          <input
            ref={inputRef}
            className="w-weather__search_input"
            type="text"
            placeholder={t("windows.weather.searchPlaceholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEscape}
          />
        </div>

        {isLoading ? (
          <div className="w-weather__loading">
            <span>{t("windows.weather.loading")}</span>
          </div>
        ) : (
          <>
            <div className="w-weather__hero">
              <p className="w-weather__hero_city">{city}</p>
              <p className="w-weather__hero_temperature">{temp}°</p>
              <p className="w-weather__hero_condition">{condition}</p>
              <p className="w-weather__hero_highLowTemp">
                {t("windows.weather.highLabel")}:{tempMax}°&nbsp;&nbsp;
                {t("windows.weather.lowLabel")}:{tempMin}°
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
                      <span>{t("windows.weather.forecastTitle")}</span>
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
                      <span>{t("windows.weather.conditionsTitle")}</span>
                    </header>
                    <hr />
                    <div>
                      {humidity !== null && (
                        <div>
                          <span>💧 {t("windows.weather.humidity")}</span>
                          <span>{humidity}%</span>
                        </div>
                      )}
                      {windSpeed !== null && (
                        <div>
                          <span>💨 {t("windows.weather.wind")}</span>
                          <span>
                            {windSpeed} {t("windows.weather.windUnit")}
                          </span>
                        </div>
                      )}
                      {cloudiness !== null && (
                        <div>
                          <span>☁️ {t("windows.weather.cloudCover")}</span>
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
