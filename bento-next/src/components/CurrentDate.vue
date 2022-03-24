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
  mm.value = `${monthNames[date.getMonth()]} `;
  dd.value = date.getDate();
};
</script>

<template>
  <div class="date flex align-center justify-center mt-7">
    <div id="month" class="text-[8vh] mr-5"><p>{{ mm }} </p></div>
    <div id="day" class="text-[8vh]">{{ dd }}</div>
  </div>
</template>
