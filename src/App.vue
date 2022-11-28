<script setup>
import SearchBar from "./components/SearchBar.vue";
import ThemeButton from "./components/ThemeButton.vue";
import DigitalClock from "./components/DigitalClock.vue";
import Greeter from "./components/Greeter.vue";
import CurrentDate from "./components/CurrentDate.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import ButtonsOne from "./components/ButtonsOne.vue";
import ButtonsTwo from "./components/ButtonsTwo.vue";
import ListOne from "./components/ListOne.vue";
import ListTwo from "./components/ListTwo.vue";

//import ButtonsTwo from "./components/ButtonsTwo.vue";
//import ListsOne from "./components/ListsOne.vue";
//import ListsTwo from "./components/ListsTwo.vue";

import { config } from "../config";
import "./assets/css/main.css";
</script>

<template>
  <div
    class="bg-background dark:bg-darkbackground w-screen h-screen"
    :class="config.imageBackground ? 'backgroundImage bg-transparent dark:bg-transparent' : ''"
  >
    <div
      id="app"
      class="flex w-4/5 h-screen justify-center mx-auto bg-background dark:bg-darkbackground transition-all ease-in-out duration-150"
      :class="config.imageBackground ? 'bg-transparent dark:bg-transparent' : ''"
    >
      <ThemeButton :class="config.componentsEnabled.themeButton ? '' : 'hidden'" />
      <SearchBar v-if=config.componentsEnabled.searchBar />

      <div class="box w-full grid grid-cols-4 grid-rows-4 gap-5 p-1 lg:gap-6 lg:p-5">
        <div
          class="timeBlock row-start-1 row-span-2 col-start-1 col-span-4 flex flex-col items-center justify-center lg:col-span-2"
        >
          <DigitalClock v-if=config.componentsEnabled.clock />
          <Greeter v-if=config.componentsEnabled.greeter />
        </div>
        <div
          class="weatherBlock pt-4 lg:pt-0 col-start-1 lg:col-start-3 col-span-4 lg:col-span-2 row-start-2 row-span-1 lg:row-start-1 lg:row-span-2 flex-col items-center justify-center flex"
        >
          <div class="date items-center justify-center hidden lg:flex">
            <CurrentDate v-if=config.componentsEnabled.date />
          </div>
          <div class="items-center justify-center" >
            <Suspense>
              <CurrentWeather v-if=config.componentsEnabled.weather />
            </Suspense>
          </div>
        </div>

        <div
          class="linksBlock row-start-3 row-span-2 col-start-1 col-span-4 grid grid-cols-4 grid-rows-2 gap-[1.5vw]"
          id="linksBlock"
        >
          <div class="linksBlockLeft row-start-1 row-span-2 col-start-1 col-span-4 lg:col-span-2" id="linksBlockLeft">
            <div
              class="buttonsContainer h-full w-full grid grid-cols-3 grid-rows-2 gap-[3vw] py-24 lg:p-5 lg:gap-[1.5vw]"
              id="buttons1"
              v-if="config.bentoLayout == 'bento' || config.bentoLayout == 'buttons'"
            >
              <ButtonsOne />
            </div>
            <div
              class="listsContainerw-full h-full grid grid-cols-2 grid-rows-1 gap-[3vw] p-5"
              id="lists1"
              v-if="config.bentoLayout == 'lists'"
            >
              <ListOne />
            </div>
          </div>

          <div
            class="linksBlockRight row-start-1 row-span-2 col-start-3 col-span-2 hidden lg:block"
            id="linksBlockRight"
          >
            <div
              class="listsContainer w-full h-full grid grid-cols-2 grid-rows-1 gap-[3vw] p-5"
              id="lists1"
              v-if="config.bentoLayout == 'bento'"
            >
              <ListOne />
            </div>
            <div
              class="listsContainer w-full h-full grid grid-cols-2 grid-rows-1 gap-[3vw] p-5"
              id="lists2"
              v-if="config.bentoLayout == 'lists'"
            >
              <ListTwo />
            </div>
            <div
              class="buttonsContainer h-full w-full grid grid-cols-3 grid-rows-2 gap-[3vw] py-24 lg:p-5 lg:gap-[1.5vw]"
              id="buttons2"
              v-if="config.bentoLayout == 'buttons'"
            >
              <ButtonsTwo />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
