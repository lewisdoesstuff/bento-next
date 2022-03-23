<template>
  <component :is="icon" />
</template>

<script>
import * as icons from 'lucide-vue-next';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      return icons[this.name];
    },
  },
};
</script>
