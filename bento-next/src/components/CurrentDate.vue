<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
  displayDate();
});

const mm = ref(null);
const dd = ref(null);

const displayDate = () => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date();
  mm.value = monthNames[date.getMonth()];
  dd.value = date.getDate();
};
</script>

<template>
  <div class="date">
    <div id="month">{{ mm }}</div>
    <div id="day">{{ dd }}</div>
  </div>
</template>
