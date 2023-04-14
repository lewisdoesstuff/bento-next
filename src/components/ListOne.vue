<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';
import { prefixedIcon } from '../scripts/iconPrefix';
import { List } from '../types/config';

const props = defineProps<{
  list: List;
}>();
</script>

<template>
  <div
    class="flex w-72 flex-col items-center rounded-lg bg-cards pb-2 pt-4 shadow-md transition-all ease-in-out hover:-translate-y-2 hover:shadow-lg dark:bg-darkcards duration-200"
  >
    <fa-icon class="h-10 w-10 pb-4 text-foreground dark:text-darkforeground" :icon="prefixedIcon(list.icon)"></fa-icon>
    <div class="flex h-full w-full flex-col justify-between px-8 text-center">
      <a
        v-for="(link, index) in props.list.links"
        :key="index"
        :target="config.openInNewTab ? '_blank' : ''"
        :href="link.url"
        class="w-full rounded-lg py-4 text-3xl font-bold text-foreground hover:bg-accent dark:text-darkforeground dark:hover:bg-darkaccent"
        >{{ link.name }}</a
      >
    </div>
  </div>
</template>
