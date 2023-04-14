<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { useConfigStore } from '../store/store';
import { OpenWeatherMap } from '../types/openWeatherMap';
import { getIcon } from '../scripts/weather';

const store = useConfigStore();

const weather: Ref<OpenWeatherMap | null> = ref(null);

onMounted(async () => {
  weather.value = await store.weather;
  store.weatherIcon = await getIcon();
});

const formatDescription = () => {
  if (weather.value) {
    const desc = weather.value.weather[0].description;
    // Uppercase the first letter
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  }
  return 'Unknown';
};
</script>

<template>
  <div class="flex items-center justify-center">
    <img class="h-10 w-10" :src="store.weatherIcon" />
    <p class="ml-4 font-sans text-3xl font-bold text-foreground dark:text-darkforeground">{{ weather?.main.temp }}°</p>
    <p class="ml-4 font-sans text-xl text-foreground dark:text-darkforeground">{{ formatDescription() }}</p>
  </div>
</template>
