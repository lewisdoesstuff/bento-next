<script setup>
import { defineProps } from "vue";
import { config } from "../../config";

const props = defineProps({
  icon: String,
  links: Array,
});

const prefixedIcon = () => {
  if (props.icon.startsWith("fab-")) {
    let fabless = props.icon.split("fab-")[1];
    return [`fab`, fabless];
  } else {
    return props.icon;
  }
};
</script>

<template>
  <div class="contents">
      <fa-icon class="mt-12 listIcon w-8 my-4 grow text-foreground dark:text-darkforeground justify-self-start content-start basis-10" :icon="prefixedIcon()"></fa-icon>
      <a
        v-for="(link, index) in links"
        :key="index"
        :target="config.openInNewTab ? '_blank' : ''"
        :href="link.link"
        class="listItem text-center justify-center  rounded-md font-bold text-foreground text-3xl dark:text-darkforeground hover:bg-accent dark:hover:bg-darkaccent grow flex mb-8 items-center"
        >{{ link.name }}</a
      >
  </div>
</template>
