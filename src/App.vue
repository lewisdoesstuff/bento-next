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
import { setTheme, setFont } from './scripts/updateTheme';

const store = useConfigStore();
document.title = config.title;

onBeforeMount(() => {
  useConfigStore();
  setTheme();
  setFont();
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
    class="h-screen w-full bg-background dark:bg-darkbackground"
    :class="config.backgroundImage ? 'bg-transparent dark:bg-transparent' : ''"
    :style="{ backgroundImage: store.backgroundImage === '' ? '' : `url(${store.backgroundImage})`, backgroundSize: 'cover' }"
  >
    <link rel="stylesheet" :href="store.themeCss" :class="store.colors" />
    <div class="flex h-full w-full flex-col items-center justify-between">
      <div class="grid w-full grid-cols-[1fr_minmax(0,36rem)_1fr] items-center gap-4 px-2 pt-6">
        <SearchBar v-if="config.componentsEnabled.searchBar" class="col-start-2" />
        <ThemeButton v-if="config.componentsEnabled.themeButton" class="col-start-3 justify-self-end" />
      </div>
      <div class="grid h-2/5 w-full grid-cols-1 place-items-center content-center gap-2 xl:grid-cols-2 xl:gap-y-4">
        <DigitalClock v-if="config.componentsEnabled.clock" class="xl:col-start-1 xl:row-start-1" />
        <CurrentDate v-if="config.componentsEnabled.date" class="hidden xl:col-start-2 xl:row-start-1 xl:block" />
        <Greeter v-if="config.componentsEnabled.greeter" class="hidden xl:col-start-1 xl:row-start-2 xl:flex" />
        <Suspense>
          <CurrentWeather v-if="config.componentsEnabled.weather" class="xl:col-start-2 xl:row-start-2" />
        </Suspense>
      </div>
      <div class="mb-8 flex h-2/5 w-full flex-row justify-evenly px-[4%] md:mb-16 xl:justify-center xl:gap-16 xl:px-[7%]">
        <ButtonsContainer class="w-full" :class="{ hidden: config.layout === 'lists', 'md:w-1/2': config.layout === 'bento' }" />
        <ListContainer class="w-1/2" :class="{ hidden: config.layout === 'buttons' }" />
      </div>
    </div>
  </div>
</template>
