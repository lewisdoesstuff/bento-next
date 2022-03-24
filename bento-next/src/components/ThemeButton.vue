<script setup>
import { onMounted, ref } from "vue";
import { updateTheme, theme } from "../scripts/updateTheme";
onMounted(() => {
  updateTheme();
});

const currentTheme = ref(theme);
const toggleTheme = () => {
  if (localStorage.theme === "dark") {
    localStorage.theme = "light";
  } else {
    localStorage.theme = "dark";
  }
  updateTheme();
};
</script>

<template>
  <button
    id="themeButton"
    @click="toggleTheme()"
    class="absolute mx-1 right-5 top-5 border-0 cursor-pointer text-foreground dark:text-darkforeground"
  >
    <fa-icon :icon="currentTheme == 'dark' ? 'moon' : 'sun'" id="icon" class="w-5 h-5" />
  </button>
</template>

<style></style>
