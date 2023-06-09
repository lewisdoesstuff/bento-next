<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { config } from '../../config';

onMounted(() => {
  displayClock();
});

const hours = ref('00');
const min = ref('00');
const ampm = ref('am');

const displayClock = () => {
  const date = new Date();

  ampm.value = date.getHours() >= 12 ? 'pm' : 'am';

  // Get the hours, providing the 12-hour format if set.
  hours.value = config.twelveHourFormat ? (date.getHours() % 12).toString() : date.getHours().toString();
  // Get the minutes, adding a leading zero if needed.
  min.value = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString();
};

setInterval(() => displayClock(), 1000);
</script>

<template>
  <div class="flex flex-row justify-center w-full">
    <div class="font-sans text-[12vh] leading-none font-bold text-foreground dark:text-darkforeground">{{ hours }}</div>
    <div class="font-sans text-[12vh] leading-none font-bold text-foreground dark:text-darkforeground" :class="config.flashSeparator ? 'pulse' : ''">
      {{ ':' }}
    </div>
    <div class="font-sans text-[12vh] leading-none font-bold text-foreground dark:text-darkforeground">
      {{ min }}
    </div>
    <div class="font-sans text-[12vh] leading-none font-bold text-foreground dark:text-darkforeground" v-if="config.twelveHourFormat">
      {{ ampm }}
    </div>
  </div>
</template>

<style>
@keyframes pulse {
  0% {
    opacity: 0.25;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
}
.blink {
  animation: pulse 1s cubic-bezier(0.05, 0.46, 0.92, 0.5) infinite;
}
</style>
