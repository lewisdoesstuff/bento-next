<script setup>
import { config } from "../../config";
import SingleList from "./SingleList.vue";

const items = config.secondListsContainer;
</script>

<template>
  <div class="contents">
    <div v-for="item in items" :key="item.id" class="contents">
      <SingleList :icon="item.icon" :links="item.links"></SingleList>
    </div>
  </div>
</template>
