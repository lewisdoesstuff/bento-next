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
  localStorage.setItem('colors', theme);
}
</script>

<template>
  <div class="absolute right-1 py-2 mt-2 bg-cards dark:bg-darkcards text-foreground dark:text-darkforeground rounded-md shadow-xl w-max">
    <a v-for="(theme, index) in config.themes" :key="index" @click="setTheme(theme)" class="block px-4 py-2 text-md cursor-auto">{{
      theme
    }}</a>
  </div>
</template>
