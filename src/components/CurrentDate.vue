<script setup lang="ts">
import { useClock } from '../scripts/useClock';

const { month, day } = useClock();
</script>

<template>
  <p class="display-text text-center font-bold text-foreground dark:text-darkforeground">{{ month }} {{ day }}</p>
</template>
