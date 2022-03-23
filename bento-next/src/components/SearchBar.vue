<script setup>
import { config } from '../../config.js';
import { ref, onMounted } from 'vue';

const search = ref(null);

const searchText = ref('');
onMounted(() => {
  search.value.focus();
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
  } else {
    return config.barPlaceholder;
  }
};

const submitted = () => {
  if (config.openInNewTab) {
    window.open(`${engines[config.searchEngine].url}${searchText.value}`);
  } else {
    window.location.href = `${engines[config.searchEngine].url}${
      searchText.value
    }`;
  }
  searchText.value = '';
};
</script>

<template>
  <div class="search" ref="search">
    <form
      id="form"
      class="searchform"
      role="search"
      @submit.prevent="submitted()"
    >
      <input
        type="search"
        autofocus="autofocus"
        onfocus="this.select()"
        class="searchinput"
        id="query"
        name="q"
        :placeholder="placeholder()"
        :aira-label="placeholder()"
        v-model="searchText"
      />
      <button class="searchbutton">
        <svg class="searchsvg" id="path" viewBox="0 0 1024 1024">
          <path class="path1"></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
