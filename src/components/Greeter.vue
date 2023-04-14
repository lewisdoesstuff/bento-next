<script setup lang="ts">
import { Ref, ref } from 'vue';
import { config } from '../../config';
import contenteditable from 'vue-contenteditable';

const today = new Date();
const hour = today.getHours();

const getGreeting = () => {
  if (hour >= 23 || hour < 6) {
    return `${config.greetingNight} `;
  } else if (hour >= 6 && hour < 12) {
    return `${config.greetingMorning} `;
  } else if (hour >= 12 && hour < 17) {
    return `${config.greetingAfternoon} `;
  }
  return `${config.greetingEvening} `;
};

const name = () => localStorage.getItem('name') || config.name;

const input = ref(name());
const nameBox: Ref<HTMLElement | null> = ref(null);
const save = () => {
  if (nameBox.value) {
    nameBox.value.blur();
  }
  // Delete the item if the input is empty, add it if not.
  const storageAction = input.value === '' ? 'removeItem' : 'setItem';
  localStorage[storageAction]('name', input.value);

  input.value = name();
};
</script>

<template>
  <div class="flex w-full justify-center">
    <div>
      <span class="text-xl text-foreground dark:text-darkforeground">{{ getGreeting() }}</span>
      <contenteditable
        ref="nameBox"
        tag="span"
        :contenteditable="true"
        v-model="input"
        :noNL="true"
        @returned="save()"
        class="text-xl text-foreground outline-none hover:bg-cards dark:text-darkforeground hover:dark:bg-darkcards"
      ></contenteditable>
    </div>
  </div>
</template>
