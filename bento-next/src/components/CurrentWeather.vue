<script setup>
import { onMounted, ref } from 'vue';
import { weatherPromise } from '../scripts/weather';

onMounted(() => {
  setWeather();
});
const icon = ref('ban');
const temp = ref('-');
const description = ref('Unknown');

const weather = ref(await weatherPromise); // the error here is a mistake. Node and Vue both support top level await.

const setWeather = () => {
  temp.value = weather.value.temperature;

  const words = weather.value.description.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  let caps = words.join(' ');
  description.value = caps;

  icon.value = `https://openweathermap.org/img/wn/${weather.value.iconId}@2x.png`;
};
</script>

<template>
  <div class="weather">
    <div class="weatherIcon">
      <img :src="icon" />
    </div>
    <div class="weatherValue">
      <p>{{ temp }}°</p>
    </div>
    <div class="weatherDescription">
      <p>{{ description }}</p>
    </div>
  </div>
</template>
