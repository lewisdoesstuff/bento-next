<script setup>
import { config } from "../../config";

const items = config.firstlistsContainer;
console.log(items);
</script>

<template>
  <div>
    <div v-for="item in items" :key="item.id" class="card list" :class="'list__' + item.id" :id="'list_' + item.id">
      <fa-icon class="listIcon" :icon="item.icon"></fa-icon>
      <a
        v-for="(link, index) in item.links"
        :key="index"
        :target="config.openInNewTab ? '_blank' : ''"
        :href="link.link"
        class="listItem"
        >{{ link.name }}</a
      >
    </div>
  </div>
</template>
