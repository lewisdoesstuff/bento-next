<script setup>
import { onMounted, ref } from "vue";
import { updateTheme, theme } from "../scripts/updateTheme";
import ThemeDropdown from "./ThemeDropdown.vue";
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
const show = ref(false);
const isOpen = () => {
  show.value = !show.value;
  
};
</script>

<template>
  <div class="group">
    <button
      id="themeButton"
      @click="toggleTheme()"
      class="absolute mx-1 right-7 top-16 lg:top-4 border-0 cursor-pointer text-foreground dark:text-darkforeground"
    >
      <fa-icon :icon="currentTheme == 'dark' ? 'moon' : 'sun'" id="icon" class="w-5 h-5" />
    </button>
    <ThemeDropdown @click.prevent class="top-20 lg:top-10 right-6 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in-out"/>
  </div>
</template>

<style></style>
