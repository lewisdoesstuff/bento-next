<script setup>
import { config } from "../../config";

const items = config.firstButtonsContainer;
console.log(items);
</script>

<template>
  <div>
    <a
      v-for="item in items"
      :key="item.id"
      :href="item.link"
      :target="config.openInNewTab ? '_blank' : ''"
      class="card button"
      :class="'button' + item.id"
    ></a>
    <fa-icon v-for="item in items" :key="item.id" :icon="item.icon"></fa-icon>
  </div>
</template>
