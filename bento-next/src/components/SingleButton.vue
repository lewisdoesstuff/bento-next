<script setup>
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
      class="card flex justify-center items-center w-max shadow-sm rounded-md hover:-translate-y-1 hover:shadow-lg"
      :class="'button__' + props.id"
    ></a>
    <fa-icon :icon="prefixedIcon()" class="w-10 h-10"></fa-icon>
  </div>
</template>
