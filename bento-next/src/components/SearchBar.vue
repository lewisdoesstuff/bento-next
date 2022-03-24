<script setup>
import { config } from "../../config.js";
import { ref, onMounted } from "vue";

const search = ref(null);

const searchText = ref("");
onMounted(() => {
  search.value.focus();
});

const engines = {
  google: {
    url: "https://www.google.com/search?q=",
    display: "Google"
  },
  ddg: {
    url: "https://duckduckgo.com/?q=",
    display: "DuckDuckGo"
  }
};

const placeholder = () => {
  if (config.barPlaceholder === "") {
    return engines[config.searchEngine].display;
  } else {
    return config.barPlaceholder;
  }
};

const submitted = () => {
  if (config.openInNewTab) {
    window.open(`${engines[config.searchEngine].url}${searchText.value}`);
  } else {
    window.location.href = `${engines[config.searchEngine].url}${searchText.value}`;
  }
  searchText.value = "";
};
</script>

<template>
  <div class="search absolute m-3 top-0" ref="search">
    <form
      id="form"
      class="searchform w-[500px] h-5 shadow-md rounded-md flex flex-row items-center hover:-translate-y-1 hover:shadow-lg"
      role="search"
      @submit.prevent="submitted()"
    >
      <input
        type="search"
        autofocus="autofocus"
        onfocus="this.select()"
        class="searchinput h-full w-full p-2"
        id="query"
        name="q"
        :placeholder="placeholder()"
        :aira-label="placeholder()"
        v-model="searchText"
      />
      <button class="searchbutton cursor-pointer w-16 h-11">
        <svg class="searchsvg fill-current w-full h-full p-3" id="path" viewBox="0 0 1024 1024">
          <path class="path"></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<style scoped>
#path path {
  d: path(
    "M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
  );
}
</style>
