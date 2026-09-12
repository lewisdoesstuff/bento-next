<script setup lang="ts">
import { config } from '../../config';
import { layoutComposition } from '../scripts/layouts';
import LaunchTile from './LaunchTile.vue';

const { buttonGroups } = layoutComposition[config.layout];
</script>

<template>
  <div
    v-if="buttonGroups > 0"
    class="grid w-full grid-rows-2 gap-8"
    :class="[buttonGroups === 2 ? 'grid-cols-6' : 'grid-cols-3', buttonGroups === 1 ? 'md:w-1/2' : '']"
  >
    <div v-for="i in buttonGroups" :key="i" class="contents">
      <div v-for="button in config.buttons[i - 1]" :key="button.name">
        <LaunchTile :button="button" class="h-full rounded-lg hover:-translate-y-2 2xl:rounded-xl" />
      </div>
    </div>
  </div>
</template>
