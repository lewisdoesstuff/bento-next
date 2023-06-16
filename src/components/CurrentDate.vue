<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
  displayDate();
});

const mm = ref('');
const dd = ref('');

const displayDate = () => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = new Date();
  mm.value = `${monthNames[date.getMonth()]} `;
  dd.value = date.getDate().toString();
};
</script>

<template>
  <p class="text-[12vh] leading-none font-bold text-foreground dark:text-darkforeground text-center">{{ mm }} {{ dd }}</p>
</template>
