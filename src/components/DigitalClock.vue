<script setup lang="ts">
import { config } from '../../config';
import { useClock } from '../scripts/useClock';

const { hours, minutes, ampm } = useClock();
</script>

<template>
  <div class="flex w-full flex-row items-end justify-center">
    <div class="display-text font-sans font-bold text-foreground dark:text-darkforeground">{{ hours }}</div>
    <div class="display-text font-sans font-bold text-foreground dark:text-darkforeground" :class="config.flashSeparator ? 'blink' : ''">
      {{ ':' }}
    </div>
    <div class="display-text font-sans font-bold text-foreground dark:text-darkforeground">
      {{ minutes }}
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
