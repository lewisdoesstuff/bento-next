<script setup>
import * as config from "../../config.js";
import { onMounted } from "vue";

onMounted(() => {
  this.$refs.search.focus();
});

const engines = {
  google: {
    url: "https://www.google.com/search?q=",
    display: "Google",
  },
  ddg: {
    url: "https://duckduckgo.com/?q=",
    display: "DuckDuckGo",
  },
};

const placeholder = () => {
  if (config.barPlaceholder === "") {
    return engines[config.barPlaceholder].display;
  } else {
    return config.barPlaceholder;
  }
};

const query = "";
const submitted = (event) => {
  event.preventDefault();
  if (this.$config.openInNewTab) {
    window.open(`${engines[config.searchEngine].url}${query}`);
  }
};
</script>

<template>
  <div class="search" ref="search">
    <form
      id="form"
      class="searchform"
      role="search"
      @submit="submitted(e)"
      :value="query"
    >
      <input
        type="search"
        autofocus="autofocus"
        onfocus="this.select()"
        class="searchinput"
        id="query"
        name="q"
        :src="placeholder()"
        :aira-label="placeholder()"
      />
      <button class="searchbutton">
        <svg class="searchsvg" id="path" viewBox="0 0 1024 1024">
          <path class="path1"></path>
        </svg>
      </button>
    </form>
    `
  </div>
</template>

<style scoped>
@import url(../assets/app.css);
@import url(../assets/main.css);
@import url(../assets/bento.css);
</style>
