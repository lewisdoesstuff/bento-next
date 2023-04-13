<script setup lang="ts">
import { defineProps } from "vue";
import { config } from "../../config";

const props = defineProps({
  link: String,
  id: String,
  icon: String
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
    <a
      :key="props.id"
      :href="props.link"
      :target="config.openInNewTab ? '_blank' : ''"
      class="card flex justify-center items-center w-full text-foreground dark:text-darkforeground hover:bg-accent dark:hover:bg-darkaccent"
      :class="'button__' + props.id"
      ><fa-icon :icon="prefixedIcon()" class="h-[40%] w-5/12 transition-none"></fa-icon
    ></a>
  </div>
</template>
