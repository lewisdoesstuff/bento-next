<script setup lang="ts">
import { defineProps } from 'vue';
import { config } from '../../config';
import { Button } from '../types/config';
import { prefixedIcon } from '../scripts/iconPrefix';

const props = defineProps<{
  button: Button;
}>();
//48 52
</script>

<template>
  <a
    class="flex h-full items-center justify-center rounded-lg 2xl:rounded-xl bg-cards text-foreground shadow-md transition-all duration-200 hover:-translate-y-2 hover:bg-accent hover:text-sforeground hover:shadow-lg dark:bg-darkcards dark:text-darkforeground dark:hover:bg-darkaccent dark:hover:text-darksforeground"
    :href="props.button.url"
    :target="config.openInNewTab ? '_blank' : ''"
  >
    <fa-icon :icon="prefixedIcon(props.button.icon)" class="h-[45%] w-[45%]" />
  </a>
</template>
