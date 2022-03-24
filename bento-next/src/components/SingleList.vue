<script setup>
import { defineProps } from "vue";
import { config } from "../../config";

const props = defineProps({
  icon: String,
  links: Array
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
    <fa-icon class="listIcon mb-5 w-6 h-6" :icon="prefixedIcon()"></fa-icon>
    <a
      v-for="(link, index) in links"
      :key="index"
      :target="config.openInNewTab ? '_blank' : ''"
      :href="link.link"
      class="listItem text-lg mt-1 p-2 rounded-md font-bold text-center w-4/5"
      >{{ link.name }}</a
    >
  </div>
</template>
