<script setup lang="ts">
import { ref } from "vue";
import { config } from "../../config";
import contenteditable from "vue-contenteditable";
const today = new Date();
const hour = today.getHours();

const getGreeting = () => {
  if (hour >= 23 || hour < 5) {
    return `${config.greetingNight} `;
  } else if (hour >= 6 && hour < 12) {
    return `${config.greetingMorning} `;
  } else if (hour >= 12 && hour < 17) {
    return `${config.greetingAfternoon} `;
  } else {
    return `${config.greetingEvening} `;
  }
};

const name = () => {
  if (!localStorage.getItem("name")) {
    return config.name;
  } else {
    return localStorage.getItem("name");
  }
};
const save = () => {
  document.activeElement.blur();
  if (input.value == "") {
    localStorage.removeItem("name");
  } else {
    localStorage.setItem("name", input.value);
  }
  input.value = name();
};

const input = ref(name());
//

//    <input v-else type="text" :value="name()" class="text-2xl text-foreground dark:text-darkforeground   w-14" @keyup.enter="editing = !editing"/>
const editing = ref(false);
</script>

<template>
  <div class="flex justify-between">
    <span class="text-[2vh] text-foreground dark:text-darkforeground whitespace-pre">{{ getGreeting() }}</span>
    <contenteditable
      tag="span"
      :contenteditable="true"
      v-model="input"
      :noNL="true"
      @returned="save()"
      class="text-[2vh] text-foreground dark:text-darkforeground outline-none hover:bg-cards hover:dark:bg-darkcards"
    ></contenteditable>
  </div>
</template>
