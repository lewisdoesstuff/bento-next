import { config } from "../../config";
import { useConfigStore } from "../store/store";


/**
 * Use `prefers-color-scheme` to set the theme
 */
const useOsPreference = () => {
  const store = useConfigStore();
  const osPrefers = window.matchMedia("(prefers-color-scheme: dark)");
  osPrefers.addEventListener("change", (e) => {
    if (e.matches) {
      localStorage.setItem("theme", "dark");
      store.theme = "dark";
    }
    localStorage.setItem("theme", "light");
    store.theme = "light";
  });
};

/**
 * Use the times set in the config to set the theme
 */
export const useSetTime = () => {
  const store = useConfigStore();
  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes();
  if (time > config.darkModeOnTime) {
    localStorage.setItem("theme", "dark");
    store.theme = "dark";
    return;
  }
  if (time < config.lightModeOnTime) {
    localStorage.setItem("theme", "dark");
    store.theme = "dark";
    return;
  }
  localStorage.setItem("theme", "light");
  store.theme = "light";
  return;
};

/**
 * Use weather data to set the theme based on sunrise and sunset
 */
export const useSunriseSunset = async () => {
  const store = useConfigStore();
  const weather = await store.weather;
  const now = Date.now() / 1000;
  if (weather) {
    if (weather.sys.sunrise > now || weather.sys.sunset < now) {
      localStorage.setItem("theme", "dark");
      store.theme = "dark";
      return;
    }
  }
  localStorage.setItem("theme", "light");
  store.theme = "light";
  return;
};

/**
 * Sets the theme based on the config
 */
export const setTheme = () => {
  switch (config.autoTheme) {
    case "system":
      useOsPreference();
      break;
    case "location":
      useSunriseSunset();
      break;
    case "preset":
      useSetTime();
      break;
    case "none":
      break;
  }
};
