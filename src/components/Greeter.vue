<script setup lang="ts">
import { useClock } from '../scripts/useClock';
import { useEditableName } from '../scripts/useEditableName';
import contenteditable from 'vue-contenteditable';

const { greeting } = useClock();
const { name, nameBox, save } = useEditableName();
</script>

<template>
  <div class="flex w-full justify-center">
    <div>
      <span class="text-xl text-foreground dark:text-darkforeground">{{ greeting }}</span>
      <contenteditable
        ref="nameBox"
        tag="span"
        :contenteditable="true"
        v-model="name"
        :noNL="true"
        @returned="save()"
        class="text-xl text-foreground outline-none hover:bg-cards dark:text-darkforeground hover:dark:bg-darkcards"
      ></contenteditable>
    </div>
  </div>
</template>
