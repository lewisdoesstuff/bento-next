<script setup lang="ts">
import { onMounted, ref } from "vue";

onMounted(() => {
  displayDate();
});

const mm = ref(null);
const dd = ref(null);

const displayDate = () => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const date = new Date();
  mm.value = `${monthNames[date.getMonth()]} `;
  dd.value = date.getDate();
};
</script>

<template>
  <div class="date flex align-center justify-center mt-7">
    <div id="month" class="">
      <p class="text-[8vh] font-bold mr-5 text-foreground dark:text-darkforeground">{{ mm }}</p>
    </div>
    <div id="day" class="">
      <p class="text-[8vh] font-bold text-foreground dark:text-darkforeground">{{ dd }}</p>
    </div>
  </div>
</template>
