import { defineStore } from 'pinia';
import { OpenWeatherMap } from '../types/openWeatherMap';
import { getWeather } from '../scripts/weather';
import { config } from '../../config';
import { useDark } from '@vueuse/core';
const getDefaultColors = () => {
  const colors = localStorage.getItem('colors');
  return colors || config.theme;
};

const getDefaultTheme = () => {
  const isDark = useDark();
  return isDark.value ? 'dark' : 'light';
};

const getImageBackgroundUrl = () => {
  if (config.backgroundImage === '') {
    return '';
  }
  if (config.backgroundImage.startsWith('http')) {
    return new URL(config.backgroundImage).href;
  }
  return new URL(`../../assets/images/${config.backgroundImage}`, import.meta.url).href;
};

const initialState = {
  weather: getWeather() as Promise<OpenWeatherMap | null>,
  weatherIcon: new URL(`../assets/icons/weather/${config.weatherIcons}/unknown.png`, import.meta.url).href as string,
  theme: getDefaultTheme() as "light" | "dark",
  colors: getDefaultColors(),
  themeCss: new URL(`./src/assets/css/themes/${getDefaultColors()}.css`, import.meta.url).href,
};

export const useConfigStore = defineStore('config', {
  state: () => initialState,
  actions: {},
});
