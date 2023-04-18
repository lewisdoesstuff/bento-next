<script setup lang="ts">
import { config } from '../../config';
import ListOne from './ListOne.vue';
const layout = config.layout;

const listAmount = () => {
  if (layout === 'bento') return 1;
  if (layout === 'lists') return 2;
  return 0;
};
</script>

<template>
  <div v-for="i in listAmount()" :key="i" class="h-full w-1/2">
    <div class="flex h-full justify-center gap-16 w-full flex-row grow">
      <ListOne class="w-1/2" :list="config.lists[i - 1][0]" />
      <ListOne class="w-1/2" :list="config.lists[i - 1][1]" />
    </div>
  </div>
</template>
