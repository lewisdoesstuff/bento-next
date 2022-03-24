<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  updateTheme();
});

var theme = ref("");

const updateTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    theme.value = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    theme.value = "light";
  }
};

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
  <button id="themeButton" @click="toggleTheme()" class="absolute mx-1 right-5 top-5 border-0 cursor-pointer">
    <fa-icon :icon="theme == 'dark' ? 'moon' : 'sun'" id="icon" class="w-5 h-5" />
  </button>
</template>

<style></style>
