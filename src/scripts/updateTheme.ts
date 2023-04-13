import { config } from "../../config";
import { useConfigStore } from "../store/store";

const store = useConfigStore();

const useOsPreference = () => {
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

export const useSetTime = () => {
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

export const useSunriseSunset = async () => {
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
      localStorage.setItem("theme", "light");
      store.theme = "light";
      break;
  }
};
