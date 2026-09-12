<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { config } from '../config';
import { useConfigStore } from './store/store';
import { setTheme, setFont } from './scripts/updateTheme';
import StandardLayout from './components/StandardLayout.vue';
import EditorialLayout from './components/EditorialLayout.vue';
import LaunchOverlay from './components/LaunchOverlay.vue';

const store = useConfigStore();
document.title = config.title;

// One place decides which layout renders.
const layoutComponents = {
  bento: StandardLayout,
  lists: StandardLayout,
  buttons: StandardLayout,
  editorial: EditorialLayout,
} as const;
const Layout = layoutComponents[config.layout];

onBeforeMount(() => {
  setTheme();
  setFont();
});

// Refresh the weather every 30 minutes.
setInterval(() => store.loadWeather(), 1800000);
</script>

<template>
  <div
    id="app"
    class="h-screen w-full bg-background dark:bg-darkbackground"
    :class="config.backgroundImage ? 'bg-transparent dark:bg-transparent' : ''"
    :style="{ backgroundImage: store.backgroundImage === '' ? '' : `url(${store.backgroundImage})`, backgroundSize: 'cover' }"
  >
    <link rel="stylesheet" :href="store.themeCss" :class="store.colors" />
    <component :is="Layout" />
    <LaunchOverlay />
  </div>
</template>
