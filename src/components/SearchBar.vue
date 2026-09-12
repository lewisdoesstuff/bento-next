<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { config } from '../../config';
import { useSearch } from '../scripts/useSearch';

const { query, placeholder, submit } = useSearch();
const searchBox = ref<HTMLElement | null>(null);

onMounted(() => {
  if (config.autoFocusBar && searchBox.value) {
    searchBox.value.focus();
  }
});
</script>

<template>
  <div ref="search">
    <form
      class="flex h-10 flex-row items-center rounded-md bg-cards text-foreground shadow-md transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-lg dark:bg-darkcards dark:text-darkforeground dark:caret-darkforeground"
      role="search"
      autocomplete="off"
      @submit.prevent="submit()"
    >
      <input
        onfocus="this.select()"
        class="h-10 w-full rounded-l-md bg-inherit px-3 text-inherit placeholder-foreground caret-inherit focus:outline-none"
        :placeholder="placeholder"
        :aria-label="placeholder"
        v-model="query"
        ref="searchBox"
      />
      <button
        class="group h-10 cursor-pointer rounded-r-md bg-cards pr-2 text-foreground transition-all duration-75 ease-in-out hover:text-sforeground dark:bg-darkcards dark:text-darkforeground dark:hover:text-darksforeground md:w-1/12 md:pr-0"
      >
        <fa-icon
          icon="magnifying-glass"
          class="rounded-r-md bg-cards fill-current transition-all duration-150 ease-in-out dark:bg-darkcards"
        ></fa-icon>
      </button>
    </form>
  </div>
</template>
