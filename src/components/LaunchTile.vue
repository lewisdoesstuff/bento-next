<script setup lang="ts">
import { config } from '../../config';
import { prefixedIcon } from '../scripts/iconPrefix';
import { launchState } from '../scripts/launch';
import type { Button } from '../types/config';

const props = defineProps<{
  button: Button;
}>();

const { launch, isLaunching } = launchState;
</script>

<template>
  <a
    :href="props.button.url"
    :target="config.openInNewTab ? '_blank' : ''"
    class="group flex items-center justify-center bg-cards text-foreground shadow-md transition-all duration-200 hover:bg-accent hover:text-sforeground hover:shadow-lg dark:bg-darkcards dark:text-darkforeground dark:hover:bg-darkaccent dark:hover:text-darksforeground"
    :class="{ 'tile-launching': isLaunching(props.button) }"
    @click="launch($event, props.button)"
  >
    <fa-icon
      :icon="prefixedIcon(props.button.icon)"
      class="h-[45%] w-[45%] transition-all duration-150 group-hover:scale-110"
      :class="{ 'opacity-0': isLaunching(props.button) }"
    />
  </a>
</template>

<style scoped>
/* Hold the tile at its card colour while launching so the overlay's fill matches it. */
.tile-launching {
  background-color: var(--cards) !important;
  transition: none !important;
}
.dark .tile-launching {
  background-color: var(--darkcards) !important;
}
</style>
