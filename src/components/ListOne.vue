<script setup>
import { config } from "../../config";
import SingleList from "./SingleList.vue";

const items = config.firstlistsContainer;
</script>

<template>
  <div class="contents">
    <div v-for="item in items" :key="item.id" :class="`list__${item.id}`" class="flex items-center justify-center flex-col card shadow-md hover:shadow-xl shadow-gray-400/75 dark:shadow-black/40">
      <SingleList class="contents" :icon="item.icon" :links="item.links"></SingleList>
    </div>
  </div>
</template>
