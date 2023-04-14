<script setup lang="ts">
import { ref } from 'vue';
import ThemeDropdown from './ThemeDropdown.vue';
import { useConfigStore } from '../store/store';
import { useDark, useToggle } from '@vueuse/core';

const store = useConfigStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);
const show = ref(false);

const updateTheme = () => {
  store.theme = isDark.value ? 'dark' : 'light';
};
</script>

<template>
  <div class="group flex flex-col pr-2 pt-7">
    <button
      @click="
        toggleDark();
        updateTheme();
      "
      class="group cursor-pointer text-foreground transition-all ease-in-out hover:text-sforeground group-hover:-translate-y-0.5 dark:text-darkforeground dark:hover:text-darksforeground"
      :class="`${show ? '-translate-y-0.5' : ''}`"
    >
      <fa-icon :icon="store.theme == 'dark' ? 'moon' : 'sun'" id="icon" class="h-6" />
    </button>
    <fa-icon
      @click="show = !show"
      :class="`${show ? 'translate-y-0 rotate-180 opacity-100' : 'rotate-0 opacity-0'}`"
      class="group translate-y-4 cursor-pointer text-foreground opacity-0 transition-all duration-200 ease-in-out hover:text-sforeground group-hover:-translate-y-0 group-hover:opacity-100 dark:text-darkforeground dark:hover:text-darksforeground"
      icon="circle-down"
    ></fa-icon>

    <transition name="fade">
      <ThemeDropdown @click.prevent v-if="show" class="mr-1 mt-14 transition-all duration-100 ease-in-out" />
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(1rem);
  opacity: 0;
}
</style>
