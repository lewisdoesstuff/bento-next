<script setup>
import { config } from "../../config.js";
import { ref, onMounted } from "vue";

const searchBox = ref(null);
const searchText = ref("");

onMounted(() => {
  if (config.autoFocusBar) {
    searchBox.value.focus();
  }
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
      class="searchform flex flex-row items-center transition-all ease-in-out duration-150"
      :class="config.barStyle"
      role="search"
      autocomplete="off"
      @submit.prevent="submitted()"
    >
      <input
        type="search"
        onfocus="this.select()"
        class="searchinput h-full w-full p-2 bg-background dark:bg-darkbackground dark:text-darkforeground caret-accent dark:caret-darkaccent focus:outline-none placeholder-foreground dark:placeholder-darkforeground shadow-inherit"
        :class="config.barStyle"
        id="query"
        name="q"
        :placeholder="placeholder()"
        :aira-label="placeholder()"
        v-model="searchText"
        ref="searchBox"
      />
      <button class="searchbutton cursor-pointer w-16 h-11">
        <svg
          class="searchsvg fill-current w-full h-full p-3 text-foreground dark:text-darkforeground shadow-inherit"
          id="path"
          :class="config.barStyle"
          viewBox="0 0 1024 1024"
        >
          <path class="path"></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<style scoped>
form.bento {
  @apply max-w-2xl mt-2 w-screen h-5 shadow-md rounded-md hover:shadow-xl;
}
form.boxy {
  @apply max-w-2xl mt-2 w-screen h-5 shadow-md border-2 border-sforeground dark:border-darksforeground;
}

form.minimal {
  @apply max-w-2xl mt-2 w-screen h-7 border-l-2 border-sforeground;
}
svg.minimal {
  @apply hidden;
}

form.rounded {
  @apply max-w-2xl mt-2 w-screen h-5 shadow-md rounded-3xl;
}
input.rounded {
  @apply rounded-3xl;
}
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

#path path {
  d: path(
    "M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
  );
}
</style>
