<script setup lang="ts">
/**
 * The standard layout shell: bento / lists / buttons. How many button and list groups
 * it renders is decided by `layoutComposition`, and the containers self-hide.
 */
import SearchBar from './SearchBar.vue';
import ThemeButton from './ThemeButton.vue';
import DigitalClock from './DigitalClock.vue';
import Greeter from './Greeter.vue';
import CurrentDate from './CurrentDate.vue';
import CurrentWeather from './CurrentWeather.vue';
import ButtonsContainer from './ButtonsContainer.vue';
import ListContainer from './ListContainer.vue';
import { config } from '../../config';
</script>

<template>
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
      <ButtonsContainer />
      <ListContainer />
    </div>
  </div>
</template>
