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
    class="group flex w-72 flex-col items-center rounded-lg bg-cards pb-2 pt-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg dark:bg-darkcards"
  >
    <fa-icon
      class="group my-2 h-10 w-10 text-foreground group-hover:text-sforeground dark:text-darkforeground dark:group-hover:text-darksforeground"
      :icon="prefixedIcon(list.icon)"
    ></fa-icon>
    <div class="flex h-full w-full flex-col justify-between px-8 text-center">
      <a
        v-for="(link, index) in props.list.links"
        :key="index"
        :target="config.openInNewTab ? '_blank' : ''"
        :href="link.url"
        class="w-full rounded-lg py-4 text-3xl font-bold text-foreground hover:bg-accent hover:text-sforeground dark:text-darkforeground dark:hover:bg-darkaccent dark:hover:text-darksforeground transition-all ease-in-out"
        >{{ link.name }}</a
      >
    </div>
  </div>
</template>
