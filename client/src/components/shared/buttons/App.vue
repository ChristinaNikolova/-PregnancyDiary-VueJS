<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'Click me',
  },
  link: {
    type: String,
  },
  isPrimary: {
    type: Boolean,
    default: true,
  },
});

const getClass = computed(() => {
  return props.isPrimary ? 'btn btn-primary' : 'btn btn-secondary';
});
</script>

<template>
  <button type="button" :class="getClass">
    <router-link v-if="link" :to="link">
      {{ props.name }}
    </router-link>
    <template v-else>
      {{ props.name }}
    </template>
  </button>
</template>
