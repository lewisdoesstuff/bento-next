<script setup lang="ts">
import { ref } from "vue";
import ThemeDropdown from "./ThemeDropdown.vue";
import { useConfigStore } from "../store/store";

const store = useConfigStore();

const toggleTheme = () => {
  store.theme = store.theme == "dark" ? "light" : "dark";
};

const show = ref(false);

</script>

<template>
  <div class="flex flex-col absolute mx-1 right-2 top-20 lg:top-4">
    <button
      id="themeButton"
      @click="toggleTheme()"
      class="border-0 cursor-pointer text-foreground dark:text-darkforeground peer"
    >
      <fa-icon :icon="store.theme == 'dark' ? 'moon' : 'sun'" id="icon" class="w-max h-[2vh]" />
    </button>
    <fa-icon
      @click="show = !show"
      :class="`${show ? '-translate-y-0 opacity-100' : 'opacity-0' } ${show ? 'rotate-180' : 'rotate-0'}`"
      class="w-max h-[1.5vh] -translate-y-5 hover:-translate-y-0 peer-hover:-translate-y-0 peer-hover:opacity-100 hover:opacity-100 opacity-0 pl-[1px] pt-1 text-foreground dark:text-darkforeground origin-center transition-all ease-in-out duration-200"
      icon="circle-down"
    ></fa-icon>

    <transition name="fade">
      <ThemeDropdown
        @click.prevent
        v-if="show"
        class="top-10 4xl:top-20 right-6 opacity-100 transition-all duration-100 ease-in-out text-[1.5vh]"
      />
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
