<script setup lang="ts">
import { config } from "../../config";
import { ref, onMounted, Ref } from "vue";

const searchBox: Ref<HTMLElement | null> = ref(null);
const searchText = ref("");

onMounted(() => {
  if (config.autoFocusBar && searchBox.value) {
    searchBox.value.focus();
  }
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
  searchText.value = "";
};
</script>

<template>
  <div ref="search">
    <form
      id="form"
      class="searchform flex flex-row items-center rounded-md transition-all duration-150 ease-in-out"
      :class="config.barStyle"
      role="search"
      autocomplete="off"
      @submit.prevent="submitted()"
    >
      <input
        type="search"
        onfocus="this.select()"
        class="searchinput h-full w-full rounded-l-md bg-cards p-[1vh] placeholder-foreground caret-accent shadow-inherit focus:outline-none dark:bg-darkcards dark:text-darkforeground dark:placeholder-darkforeground dark:caret-darkaccent"
        :class="config.barStyle"
        id="query"
        name="q"
        :placeholder="placeholder()"
        :aira-label="placeholder()"
        v-model="searchText"
        ref="searchBox"
      />
      <button
        :class="config.barStyle"
        class="searchbutton h-full w-[4em] cursor-pointer rounded-r-md bg-cards p-[0.91vh] pr-2 text-center dark:bg-darkcards"
      >
        <fa-icon
          icon="magnifying-glass"
          :class="config.barStyle"
          class="rounded-r-md bg-cards fill-current text-foreground dark:bg-darkcards dark:text-darkforeground"
        ></fa-icon>
      </button>
    </form>
  </div>
</template>

<style scoped>
form.bento {
  @apply mt-2 w-screen max-w-sm rounded-md shadow-md hover:shadow-xl lg:max-w-2xl 4xl:max-w-7xl;
}

form.boxy {
  @apply mt-2 w-screen max-w-sm border-2 border-sforeground shadow-md dark:border-darksforeground lg:max-w-2xl 4xl:max-w-7xl;
}

form.minimal {
  @apply mt-2 h-7 w-screen max-w-sm border-l-8 border-sforeground bg-cards text-transparent dark:border-darksforeground dark:bg-darkcards lg:max-w-2xl 4xl:max-w-7xl;
}
svg.minimal {
  @apply hidden;
}

input.minimal {
  @apply bg-transparent;
}
form.rounded {
  @apply mt-2 w-screen max-w-sm rounded-3xl bg-cards shadow-md dark:bg-darkcards lg:max-w-2xl 4xl:max-w-7xl;
}
input.rounded {
  @apply rounded-3xl bg-transparent;
}
button.rounded {
  @apply h-full rounded-r-3xl shadow-none;
}
svg.rounded {
  @apply rounded-r-3xl;
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
