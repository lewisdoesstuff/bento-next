<script setup lang="ts">
import { config } from "../../config";
import SingleButton from './SingleButton.vue';

const items = config.secondButtonsContainer;
</script>

<template>
  <div class="contents">
    <div class="contents" v-for="item in items" :key="item.id">
      <SingleButton :id="item.id" :link="item.link" :icon="item.icon"></SingleButton>
    </div>
  </div>
</template>
