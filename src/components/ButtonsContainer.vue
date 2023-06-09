<script setup lang="ts">
import { config } from '../../config';
import ButtonsOne from './ButtonsOne.vue';

const layout = config.layout;

const buttonsAmount = () => {
  if (layout === 'bento') return 1;
  if (layout === 'buttons') return 2;
  return 0;
};
</script>

<template>
  <div class="grid grid-rows-2 gap-8" :class="layout === 'buttons' ? 'grid-cols-6' : 'grid-cols-3'">
    <div v-for="i in buttonsAmount()" class="contents">
      <div v-for="button in config.buttons[i - 1]">
        <ButtonsOne class="" :button="button" />
      </div>
    </div>
  </div>
</template>
