<script setup lang="ts">
import { useConfigStore } from '../store/store';
import { useWeather } from '../scripts/useWeather';

const store = useConfigStore();
const { weather, description } = useWeather();
</script>

<template>
  <div class="flex items-center justify-center">
    <img class="h-10 w-10" :src="store.weatherIcon" />
    <p class="ml-4 text-3xl font-bold text-foreground dark:text-darkforeground">{{ weather?.main.temp }}°</p>
    <p class="ml-4 text-xl text-foreground dark:text-darkforeground">{{ description || 'Unknown' }}</p>
  </div>
</template>
