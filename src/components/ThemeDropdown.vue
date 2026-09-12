<script setup lang="ts">
import { config } from '../../config';
import { useConfigStore } from '../store/store';

const store = useConfigStore();
const emit = defineEmits<{ (e: 'select'): void }>();

const setTheme = (theme: string) => {
  store.colors = theme;
  store.themeCss = `${import.meta.env.BASE_URL}css/themes/${theme}.css`;
  localStorage.setItem('colors', theme);
  emit('select');
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div
    class="absolute right-0 z-20 max-h-[60vh] min-w-[11rem] overflow-y-auto rounded-lg border border-black/5 bg-cards py-1 text-foreground shadow-xl dark:border-white/10 dark:bg-darkcards dark:text-darkforeground"
  >
    <button
      v-for="(theme, index) in config.themes"
      :key="index"
      @click="setTheme(theme)"
      class="flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm transition-colors duration-100 ease-in-out hover:bg-accent hover:text-sforeground dark:hover:bg-darkaccent dark:hover:text-darksforeground"
      :class="theme === store.colors ? 'font-semibold' : ''"
    >
      <span>{{ capitalize(theme) }}</span>
      <fa-icon v-if="theme === store.colors" icon="check" class="h-3 w-3" />
    </button>
  </div>
</template>
