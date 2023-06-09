<script setup lang="ts">
import { config } from '../../config';
import { ref, onMounted, Ref } from 'vue';

const searchBox: Ref<HTMLElement | null> = ref(null);
const searchText = ref('');

onMounted(() => {
  if (config.autoFocusBar && searchBox.value) {
    searchBox.value.focus();
  }
});

const engines = {
  google: {
    url: 'https://www.google.com/search?q=',
    display: 'Google',
  },
  ddg: {
    url: 'https://duckduckgo.com/?q=',
    display: 'DuckDuckGo',
  },
};

const placeholder = () => {
  if (config.barPlaceholder === '') {
    return engines[config.searchEngine].display;
  }
  return config.barPlaceholder;
};

const submitted = () => {
  if (config.openInNewTab) {
    window.open(`${engines[config.searchEngine].url}${searchText.value}`);
  } else {
    window.location.href = `${engines[config.searchEngine].url}${searchText.value}`;
  }
  searchText.value = '';
};
</script>

<template>
  <div ref="search">
    <form
      class="mt-2 flex flex-row items-center rounded-md bg-cards text-foreground shadow-md transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-lg dark:bg-darkcards dark:text-darkforeground dark:caret-darkforeground"
      role="search"
      autocomplete="off"
      @submit.prevent="submitted()"
    >
      <input
        onfocus="this.select()"
        class="h-10 w-full rounded-l-md bg-inherit px-3 text-inherit placeholder-foreground caret-inherit focus:outline-none"
        :placeholder="placeholder()"
        :aira-label="placeholder()"
        v-model="searchText"
        ref="searchBox"
      />
      <button
        class="group h-10 pr-2 md:pr-0 md:w-1/12 cursor-pointer rounded-r-md bg-cards text-foreground transition-all duration-75 ease-in-out hover:text-sforeground dark:bg-darkcards dark:text-darkforeground dark:hover:text-darksforeground"
      >
        <fa-icon
          icon="magnifying-glass"
          class="rounded-r-md bg-cards fill-current transition-all duration-150 ease-in-out dark:bg-darkcards"
        ></fa-icon>
      </button>
    </form>
  </div>
</template>
