import { config } from "../../config.js";
import { ref } from "vue";
import { weatherPromise } from "./weather.js";

export const theme = ref("");
export const updateTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("notransition");
    document.documentElement.classList.add("dark");
    theme.value = "dark";
    document.body.classList.remove("notransition");
  } else {
    document.documentElement.classList.remove("dark");
    theme.value = "light";
  }
};

export const autoChange = async () => {
  if (config.changeThemeByOS) {
    theme.value = osTheme();
  } else if (config.changeThemeByHour) {
    theme.value = hourTheme();
  } else if (config.changeThemeByLocation) {
    theme.value = await locationTheme();
  }
  updateTheme();
};

const osTheme = () => {
  const osPrefers = window.matchMedia("(prefers-color-scheme: dark)");
  osPrefers.addEventListener('change', e => {
    if (e.matches) {
      localStorage.setItem("theme", "dark");
      return "dark";
    } else {
      localStorage.setItem("theme", "light");
      return "light";
    }
  });
};

const hourTheme = () => {
  const date = new Date();
  const hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString(); // adjust for hours/mins less than 10 (add a 0)
  const time = `${hour}:${minute}`;
  if (time >= config.hourDarkThemeActive) {
    localStorage.setItem("theme", "dark");
    return "dark";
  } else {
    localStorage.setItem("theme", "light");
    return "light";
  }
};

const locationTheme = async () => {
  const weather = await weatherPromise;
  const now = Date.now() / 1000;
  if (now >= weather.sunrise && now < weather.sunset) {
    localStorage.setItem("theme", "light");
    return "dark";
  } else {
    localStorage.setItem("theme", "dark");
    return "light";
  }
};
