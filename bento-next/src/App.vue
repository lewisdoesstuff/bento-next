<script setup>
import SearchBar from "./components/SearchBar.vue";
import ThemeButton from "./components/ThemeButton.vue";
import DigitalClock from "./components/DigitalClock.vue";
import CurrentDate from "./components/CurrentDate.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import ButtonsOne from "./components/ButtonsOne.vue";
import ListOne from "./components/ListOne.vue";

//import ButtonsTwo from "./components/ButtonsTwo.vue";
//import ListsOne from "./components/ListsOne.vue";
//import ListsTwo from "./components/ListsTwo.vue";

import { config } from "../config";
</script>

<template>
  <div id="app">
    <ThemeButton />
    <SearchBar />
    <div class="timeBlock">
      <DigitalClock />
    </div>
    <div class="weatherBlock">
      <div class="date">
        <CurrentDate />
      </div>
      <Suspense>
        <CurrentWeather />
      </Suspense>
    </div>

    <div class="linksBlock" id="linksBlock">

      <div class="linksBlockLeft" id="linksBlockLeft">
        <div
          class="buttonsContainer"
          id="buttons1"
          v-if="config.bentoLayout == 'bento' || config.bentoLayout == 'buttons'"
        >
          <ButtonsOne />
        </div>
        <div class="listsContainer" id="lists1" v-if="config.bentoLayout == 'lists'">
          <ListsOne />
        </div>
      </div>


      <div class="linksBlockRight" id="linksBlockRight">
        <div class="listsContainer" id="lists1" v-if="config.bentoLayout == 'bento'">
          <ListOne />
        </div>
        <div class="listsContainer" id="lists2" v-if="config.bentoLayout == 'lists'">
          <ListTwo />
        </div>
        <div class="buttonsContainer" id="buttons2" v-if="config.bentoLayout == 'buttons'">
          <ButtonsTwo />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "./assets/base.css";
</style>
