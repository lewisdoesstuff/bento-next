<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';
import { Button } from '../types/config';
import { prefixedIcon } from '../scripts/iconPrefix';

const props = defineProps<{
  button: Button;
}>();
</script>

<template>
  <div
    class="flex h-48 w-48 items-center justify-center rounded-lg bg-cards shadow-md transition-all duration-200 hover:-translate-y-2 hover:bg-accent hover:shadow-lg dark:bg-darkcards dark:hover:bg-darkaccent"
  >
    <a class="text-foreground dark:text-darkforeground" :href="props.button.url" :target="config.openInNewTab ? '_blank' : ''">
      <fa-icon :icon="prefixedIcon(props.button.icon)" class="h-[4.5rem] w-[4.5rem]" />
    </a>
  </div>
</template>
