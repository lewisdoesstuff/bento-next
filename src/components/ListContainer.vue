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
  <div v-for="i in listAmount()" :key="i" class="hidden md:inline w-1/3 xl:w-1/2">
    <div class="flex flex-row justify-center h-full xl:gap-[10%]">
      <ListOne class="hidden md:flex md:w-full xl:w-1/2" :list="config.lists[i - 1][0]" />
      <ListOne class="hidden xl:flex w-1/2" :list="config.lists[i - 1][1]" />
    </div>
  </div>
</template>
