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
  <div class="flex w-full flex-row items-end justify-center">
    <div class="display-text font-sans font-bold text-foreground dark:text-darkforeground">{{ hours }}</div>
    <div class="display-text font-sans font-bold text-foreground dark:text-darkforeground" :class="config.flashSeparator ? 'blink' : ''">
      {{ ':' }}
    </div>
    <div class="display-text font-sans font-bold text-foreground dark:text-darkforeground">
      {{ min }}
    </div>
    <div
      v-if="config.twelveHourFormat"
      class="mb-2 self-end font-sans text-[clamp(1.25rem,3.5vh,2.5rem)] font-bold lowercase text-foreground dark:text-darkforeground"
    >
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
