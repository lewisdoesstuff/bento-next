import { config } from "../../config";

export const getIcon = (weather) => {
  let iconTheme = config.weatherIcons;
  return new URL(`../assets/icons/weather/${iconTheme}/${weather}.png`, import.meta.url).href;
};
