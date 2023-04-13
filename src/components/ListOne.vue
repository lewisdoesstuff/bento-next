<script setup lang="ts">
import { defineProps } from "vue";
import { config } from "../../config";
import { prefixedIcon } from "../scripts/iconPrefix";
import { List } from "../types/config";

const props = defineProps<{
  list: List
}>();

</script>

<template>
  <div class="contents">
      <fa-icon class="mt-[2vh] listIcon h-[3vh] w-full my-[1vh] grow text-foreground dark:text-darkforeground justify-self-start content-start basis-10" :icon="prefixedIcon(list.icon)"></fa-icon>
      <a
        v-for="(link, index) in list.links"
        :key="index"
        :target="config.openInNewTab ? '_blank' : ''"
        :href="link.url"
        class="listItem text-center justify-center rounded-md font-bold text-foreground text-[2.5vh] dark:text-darkforeground hover:bg-accent dark:hover:bg-darkaccent grow flex mb-[1.5vh] items-center"
        >{{ link.name }}</a
      >
  </div>
</template>
