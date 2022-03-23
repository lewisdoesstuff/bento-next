<script setup>
import SearchBar from './components/SearchBar.vue';
import ThemeButton from './components/ThemeButton.vue';
import DigitalClock from './components/DigitalClock.vue';
import CurrentDate from './components/CurrentDate.vue';
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
    </div>
  </div>
</template>

<style>
@import './assets/base.css';
</style>
