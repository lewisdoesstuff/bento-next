import { defineStore } from "pinia";
import { OpenWeatherMap } from "../types/openWeatherMap";
import { getWeather } from "../scripts/weather";
import { config } from "../../config";

const getDefaultColors = () => {
  const colors = localStorage.getItem("colors");
  if (!colors) {
    return config.theme;
  }
  return JSON.parse(colors);
};

const getImageBackgroundUrl = () => {
  if (config.backgroundImage === "") {
    return "";
  }
  if (config.backgroundImage.startsWith("http")) {
    return (new URL(config.backgroundImage)).href;
  }
  return (new URL(`../../assets/images/${config.backgroundImage}`, import.meta.url)).href;
}
const initialState = {
  weather: getWeather() as Promise<OpenWeatherMap | null>,
  theme: "light" as "light" | "dark",
  colors: getDefaultColors(),
  themeCss: `./src/assets/css/themes/${getDefaultColors()}.css`,
};

export const useConfigStore = defineStore("weather", {
  state: () => initialState,
  actions: {},
});
