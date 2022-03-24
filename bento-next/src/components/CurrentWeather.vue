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
  <div class="weather flex items-center justify-center">
    <div class="weatherIcon">
      <img class="w-16 h-16" :src="icon" />
    </div>
    <div class="weatherValue ">
      <p class="text-3xl font-bold font-sans ml-4">{{ temp }}°</p>
    </div>
    <div class="weatherDescription">
      <p class="text-2xl font-sans mt-1 ml-2">{{ description }}</p>
    </div>
  </div>
</template>
