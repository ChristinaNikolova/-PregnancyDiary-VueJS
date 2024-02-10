<script setup>
const props = defineProps({
  mood: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <li class="cloud">
    {{ props.mood }}
  </li>
</template>
