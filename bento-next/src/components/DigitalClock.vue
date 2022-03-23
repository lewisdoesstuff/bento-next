<script setup>
import { ref, onMounted } from 'vue';
import { config } from '../../config.js';

onMounted(() => {
  displayClock();
});

const hh = ref(null);
const min = ref(null);
const ampm = ref(null);
const displayClock = () => {
  const date = new Date();
  min.value = ('0' + date.getMinutes()).slice(-2);
  hh.value = date.getHours();
  ampm.value = '';

  if (config.twelveHourFormat) {
    ampm.value = hh.value >= 12 ? ' pm' : ' am';
    hh.value = hh.value % 12;
    hh.value = hh.value ? hh.value : 12;
  }
};

setInterval(() => displayClock(), 1000);
</script>

<template>
  <div class="clock">
    <div id="hour">{{ hh }}</div>
    <div id="separator">{{ ':' }}</div>
    <div id="minutes">{{ min + ampm }}</div>
  </div>
</template>

<style></style>
