import { config } from "../../config";
import { useConfigStore } from "../store/store";
import { OpenWeatherMap } from "../types/openWeatherMap";

interface Position {
  lat: string;
  lon: string;
}

const toCelcius = (temp: number) => Math.round(temp - 273.15); // Convert Kelvin to Celcius
const toFahrenheit = (temp: number) => Math.round((temp * 9) / 5 - 459.67); // Convert Kelvin to Fahrenheit

/**
 * Get the URL to the weather icon for the current weather
 * @returns URL - Path to icon
 */
export const getIcon = async () => {
  const store = useConfigStore();
  const iconTheme = config.weatherIcons;
  const weather = (await store.weather)?.weather[0].icon;
  // Set the icon from the weather. If it doesn't exist, use the unknown icon.
  const icon = new URL(`../assets/icons/weather/${iconTheme}/${weather ? weather : "unknown"}.png`, import.meta.url).href;
  return new URL(icon, import.meta.url).href;
};

/**
 * Fetch the current weather from OpenWeatherMap
 * @param position Latitude and longitude
 * @returns OpenWeatherMap object
 */
const fetchWeather = async (position: Position) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&lang=${config.language}&appid=${config.weatherKey}`;
  const response = await fetch(api).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch weather! ${res.status}: ${res.statusText}`);
    }
    return res;
  });

  const data: OpenWeatherMap = await response.json().catch((err) => {
    throw new Error("Failed to parse weather!", err);
  });
  return data;
};

/**
 * Get the current position, either from the browser or the default location
 * @returns Promise<Position> - Latitude and longitude
 */
const getPosition = async () => {
  if (!(config.trackLocation && navigator.geolocation)) {
    if (!config.trackLocation) {
      return { lat: config.defaultLatitude, lon: config.defaultLongitude };
    }
    console.error("Geolocation not available");
  }

  // Return the current position from the browser, to 3 decimal places
  return new Promise<Position>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude.toFixed(3),
          lon: pos.coords.longitude.toFixed(3),
        });
      },
      () => {
        resolve({ lat: config.defaultLatitude, lon: config.defaultLongitude });
      }
    );
  });
};

/**
 * Get the current weather
 * @returns OpenWeatherMap object, or Null if failed to fetch
 */
export const getWeather = async () => {
  const pos = await getPosition();
  const weather = await fetchWeather(pos).catch((err) => {
    console.error("Failed to fetch weather!");
    console.error(err);
    return null;
  });
  if (!weather) return weather;
  weather.main.temp = config.weatherUnit === "C" ? toCelcius(weather.main.temp) : toFahrenheit(weather.main.temp);
  return weather;
};
