<script setup lang="ts">
import { config } from "../../config";
import ListOne from "./ListOne.vue";
const layout = config.layout;

const listAmount = () => {
  if (layout === "bento") return 1;
  if (layout === "lists") return 2;
  return 0;
};
</script>

<template>
  <div v-for="i in listAmount()" :key="i" class="">
    <div class="flex flex-row gap-8 h-full">
      <ListOne class="" :list="config.lists[i - 1][0]" />
      <ListOne class="" :list="config.lists[i - 1][1]" />
    </div>
  </div>
</template>
