import axios from "axios";
import type { CurrentWeather, ForecastResponse } from "../types";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCurrentWeatherByCity = async (
  city: string,
): Promise<CurrentWeather> => {
  const response = await api.get(
    `${BASE_URL}/weather?q=${city}&appid=74571e7cd24e48358e1cca1d7cf7bf9c&units=metric`,
  );
  return response.data;
};

export const getForecastByCity = async (
  city: string,
): Promise<ForecastResponse> => {
  const response = await api.get(
    `${BASE_URL}/forecast?q=${city}&appid=74571e7cd24e48358e1cca1d7cf7bf9c&units=metric`,
  );
  return response.data;
};
