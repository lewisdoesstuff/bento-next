<script setup>
import { onMounted, defineProps } from "vue";
import { config } from "../../config";
const props = defineProps({
  show: Boolean,
});

const setTheme = (theme) => {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/css/themes/${theme}.css`;
  document.head.appendChild(link);
  localStorage.setItem("colors", theme);
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>

<template>
  <div
    class="absolute right-1 py-2 mt-2 bg-cards dark:bg-darkcards text-foreground dark:text-darkforeground rounded-md shadow-xl w-max justify-center"
  >
    <p
      v-for="(theme, index) in config.themes"
      :key="index"
      @click="setTheme(theme)"
      class="block px-4 py-2 text-md cursor-pointer hover:text-background dark:hover:text-darkbackground hover:bg-accent dark:hover:bg-darkaccent text-center"
    >
      {{ capitalize(theme) }}
    </p>
  </div>
</template>
