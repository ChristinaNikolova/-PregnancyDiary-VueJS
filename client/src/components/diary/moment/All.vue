<script setup>
import Single from './Single.vue';

const props = defineProps({
  moments: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul class="week-details-moments-ul">
    <Single v-for="m in props.moments" :key="m.id" :moment="m" />
  </ul>
</template>
