<script setup>
import { config } from "../../config";
const today = new Date();
const hour = today.getHours();

const getGreeting = () => {
  if (hour >= 23 || hour < 5) {
    return `${config.greetingNight} ${config.name}`;
  } else if (hour >= 6 && hour < 12) {
    return `${config.greetingMorning} ${config.name}`;
  } else if (hour >= 12 && hour < 17) {
    return `${config.greetingAfternoon} ${config.name}`;
  } else {
    return `${config.greetingEvening} ${config.name}`;
  }
};
</script>

<template>
  <p class="text-2xl text-foreground dark:text-darkforeground">{{ getGreeting() }}</p>
</template>
