<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside, useDark, useToggle } from '@vueuse/core';
import ThemeDropdown from './ThemeDropdown.vue';
import { useConfigStore } from '../store/store';

const store = useConfigStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);
const show = ref(false);
const root = ref<HTMLElement | null>(null);

onClickOutside(root, () => (show.value = false));

const updateTheme = () => {
  store.theme = isDark.value ? 'dark' : 'light';
};
</script>

<template>
  <div ref="root" class="relative flex h-10 items-center gap-1">
    <button
      @click="
        toggleDark();
        updateTheme();
      "
      aria-label="Toggle light or dark mode"
      class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-all ease-in-out hover:-translate-y-0.5 hover:text-sforeground dark:text-darkforeground dark:hover:text-darksforeground"
    >
      <fa-icon :icon="store.theme == 'dark' ? 'moon' : 'sun'" class="h-5 w-5" />
    </button>
    <button
      @click="show = !show"
      aria-label="Choose a theme"
      :aria-expanded="show"
      class="flex h-10 w-6 cursor-pointer items-center justify-center rounded-md text-foreground opacity-60 transition-all ease-in-out hover:-translate-y-0.5 hover:text-sforeground hover:opacity-100 dark:text-darkforeground dark:hover:text-darksforeground"
    >
      <fa-icon icon="chevron-down" class="h-3.5 w-3.5 transition-transform duration-200 ease-in-out" :class="show ? 'rotate-180' : ''" />
    </button>

    <transition name="fade">
      <ThemeDropdown v-if="show" class="absolute right-0 top-full z-20 mt-2" @select="show = false" />
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-0.25rem);
  opacity: 0;
}
</style>
