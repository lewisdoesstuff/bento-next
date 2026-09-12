<script setup lang="ts">
import { config } from '../../config';
import { useClock } from '../scripts/useClock';
import ClockSeparator from './ClockSeparator.vue';

const { hours, minutes, ampm } = useClock();
</script>

<template>
  <div
    class="flex w-full flex-row items-end justify-center text-foreground dark:text-darkforeground"
    role="timer"
    :aria-label="`${hours}:${minutes}${config.twelveHourFormat ? ' ' + ampm : ''}`"
  >
    <div class="display-text font-bold tracking-[-0.04em]">{{ hours }}</div>
    <ClockSeparator :blink="config.flashSeparator" class="display-text mx-[0.06em]" />
    <div class="display-text font-bold tracking-[-0.04em]">
      {{ minutes }}
    </div>
    <div
      v-if="config.twelveHourFormat"
      class="mb-2 self-end text-[clamp(1.25rem,3.5vh,2.5rem)] font-bold lowercase"
    >
      {{ ampm }}
    </div>
  </div>
</template>
