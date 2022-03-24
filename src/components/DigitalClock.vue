<script setup>
import { ref, onMounted } from "vue";
import { config } from "../../config.js";

onMounted(() => {
  displayClock();
});

const hh = ref(null);
const min = ref(null);
const ampm = ref(null);
const displayClock = () => {
  const date = new Date();
  min.value = ("0" + date.getMinutes()).slice(-2);
  hh.value = date.getHours();
  ampm.value = "";

  if (config.twelveHourFormat) {
    ampm.value = hh.value >= 12 ? " pm" : " am";
    hh.value = hh.value % 12;
    hh.value = hh.value ? hh.value : 12;
  }
};

setInterval(() => displayClock(), 1000);
</script>

<template>
  <div class="clock flex align-center justify-center">
    <div id="hour" class="text-[12vh] font-bold font-sans text-foreground dark:text-darkforeground">{{ hh }}</div>
    <div id="separator" class="text-[12vh] font-bold font-sans text-foreground dark:text-darkforeground">{{ ":" }}</div>
    <div id="minutes" class="text-[12vh] font-bold font-sans text-foreground dark:text-darkforeground">
      {{ min + ampm }}
    </div>
  </div>
</template>

<style></style>
