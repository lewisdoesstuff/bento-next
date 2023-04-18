<script setup lang="ts">
import SearchBar from './components/SearchBar.vue';
import ThemeButton from './components/ThemeButton.vue';
import DigitalClock from './components/DigitalClock.vue';
import Greeter from './components/Greeter.vue';
import CurrentDate from './components/CurrentDate.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import ButtonsContainer from './components/ButtonsContainer.vue';
import ListContainer from './components/ListContainer.vue';
import { useConfigStore } from './store/store';
import { config } from '../config';
import { getIcon, getWeather } from './scripts/weather';
import { onBeforeMount } from 'vue';
import { setTheme } from './scripts/updateTheme';

const store = useConfigStore();
document.title = config.title;

onBeforeMount(() => {
  useConfigStore();
  setTheme();
}),
  // Fetch the weather every 30 minutes
  setInterval(async () => {
    store.weather = getWeather();
    store.weatherIcon = await getIcon();
  }, 1800000);
</script>

<template>
  <div
    id="app"
    class="h-screen w-screen bg-background dark:bg-darkbackground"
    :class="config.backgroundImage ? 'backgroundImage bg-transparent dark:bg-transparent' : ''"
  >
    <link rel="stylesheet" :href="store.themeCss" :class="store.colors" />
    <div class="flex h-full w-full flex-col items-center justify-between">
      <div class="flex w-full flex-row">
        <div class="w-1/3"></div>
        <SearchBar v-if="config.componentsEnabled.searchBar" class="w-1/3 pt-4" />
        <ThemeButton :class="config.componentsEnabled.themeButton ? '' : 'hidden'" class="ml-auto" />
      </div>
      <div class="flex h-2/5 w-3/5 flex-row items-center justify-between">
        <div>
          <DigitalClock v-if="config.componentsEnabled.clock" class="w-full" />
          <Greeter v-if="config.componentsEnabled.greeter" class="pt-4" />
        </div>
        <div>
          <CurrentDate v-if="config.componentsEnabled.date" />
          <Suspense>
            <CurrentWeather v-if="config.componentsEnabled.weather" class="pt-4" />
          </Suspense>
        </div>
      </div>
      <div class="mb-16 flex h-2/5 w-5/6 flex-row items-end justify-between">
        <ButtonsContainer class="w-1/2" />
        <ListContainer class="w-1/2" />
      </div>
    </div>
  </div>
</template>
