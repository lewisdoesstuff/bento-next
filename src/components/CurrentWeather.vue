<script setup>
import { onMounted, ref } from "vue";
import { weatherPromise } from "../scripts/weather";
import { getIcon } from "../scripts/weatherIcons";

const icon = ref("unknown");
const temp = ref("-");
const description = ref("Unknown");
onMounted(() => {
  setWeather();
});

const weather = ref(null); // the error here is a mistake. Node and Vue both support top level await.

const setWeather = async () => {
  weather.value = await weatherPromise;
  temp.value = weather.value.temperature;

  const words = weather.value.description.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  let caps = words.join(" ");
  description.value = caps;

  icon.value = weather.value.icon;
};
</script>

<template>
  <div class="weather flex items-center justify-center">
    <div class="weatherIcon">
      <img class="w-max h-[4vh]" :src="getIcon(icon)" />
    </div>
    <div class="weatherValue">
      <p class="text-[3vh] font-bold font-sans ml-4  text-foreground dark:text-darkforeground">{{ temp }}°</p>
    </div>
    <div class="weatherDescription">
      <p class="text-[2vh] font-sans ml-4 text-foreground dark:text-darkforeground">{{ description }}</p>
    </div>
  </div>
</template>
