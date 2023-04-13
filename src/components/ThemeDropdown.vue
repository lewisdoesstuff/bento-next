<script setup lang="ts">
import { config } from "../../config";
import { useConfigStore } from "../store/store";

const store = useConfigStore();

const setTheme = (theme: string) => {
  store.colors = theme;
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
