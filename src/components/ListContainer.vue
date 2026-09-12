<script setup lang="ts">
import { config } from '../../config';
import { layoutComposition } from '../scripts/layouts';
import ListOne from './ListOne.vue';

const { listGroups } = layoutComposition[config.layout];
</script>

<template>
  <div v-for="i in listGroups" :key="i" class="w-1/3 md:inline xl:w-1/2" :class="listGroups > 1 ? 'inline' : 'hidden'">
    <div class="flex h-full flex-row justify-center xl:gap-[10%]">
      <ListOne class="md:flex md:w-full xl:w-1/2" :class="listGroups > 1 ? 'flex' : 'hidden'" :list="config.lists[i - 1][0]" />
      <ListOne class="hidden w-1/2 xl:flex" :list="config.lists[i - 1][1]" />
    </div>
  </div>
</template>
