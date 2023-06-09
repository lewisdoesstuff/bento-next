<script setup lang="ts">
import { config } from '../../config';
import { useConfigStore } from '../store/store';

const store = useConfigStore();

const setTheme = (theme: string) => {
  store.colors = theme;
  store.themeCss = `${window.location.href}css/themes/${theme}.css`;
  localStorage.setItem('colors', theme);
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div
    class="absolute right-1 justify-center rounded-md bg-cards py-2 text-foreground shadow-xl dark:bg-darkcards dark:text-darkforeground"
  >
    <p
      v-for="(theme, index) in config.themes"
      :key="index"
      @click="setTheme(theme)"
      class="text-md block cursor-pointer px-4 py-2 text-center transition-all ease-in-out hover:bg-accent dark:hover:bg-darkaccent"
    >
      {{ capitalize(theme) }}
    </p>
  </div>
</template>
