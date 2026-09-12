import { computed, onMounted } from 'vue';
import { useConfigStore } from '../store/store';

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Current weather. The store owns the request and the icon; this triggers a load
 * on mount and exposes the values. Shared by CurrentWeather and the editorial layout.
 */
export const useWeather = () => {
  const store = useConfigStore();

  onMounted(() => store.loadWeather());

  const weather = computed(() => store.weather);
  const description = computed(() => (weather.value ? capitalize(weather.value.weather[0].description) : ''));

  return { weather, description };
};
