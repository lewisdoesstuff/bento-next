<script setup lang="ts">
/**
 * Font-independent clock separator: two stacked dots, so the look is identical
 * regardless of the configured font or the platform. Sized in `em`, so it scales
 * with whatever font-size its parent sets.
 */
defineProps<{ blink?: boolean }>();
</script>

<template>
  <span
    class="inline-flex h-[1em] flex-col items-center justify-center gap-[0.16em]"
    :class="{ 'animate-clock-blink': blink }"
    aria-hidden="true"
  >
    <span class="h-[0.125em] w-[0.125em] rounded-[0.02em] bg-current" />
    <span class="h-[0.125em] w-[0.125em] rounded-[0.02em] bg-current" />
  </span>
</template>
