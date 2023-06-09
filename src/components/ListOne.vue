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
    class="group flex flex-col items-center rounded-lg 2xl:rounded-xl bg-cards pb-2 pt-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg dark:bg-darkcards"
  >
    <fa-icon
      class="group my-2 h-10 w-10 text-foreground group-hover:text-sforeground dark:text-darkforeground dark:group-hover:text-darksforeground transition ease-in-out"
      :icon="prefixedIcon(list.icon)"
    ></fa-icon>
    <div class="flex h-full w-full flex-col justify-around text-center px-8">
      <a
        v-for="(link, index) in props.list.links"
        :key="index"
        :target="config.openInNewTab ? '_blank' : ''"
        :href="link.url"
        class="w-full rounded-lg py-4 text-2xl xl:text-3xl 3xl:text-4xl font-bold text-foreground transition-all ease-in-out hover:bg-accent hover:text-sforeground dark:text-darkforeground dark:hover:bg-darkaccent dark:hover:text-darksforeground duration-150"
        >{{ link.name }}</a
      >
    </div>
  </div>
</template>
