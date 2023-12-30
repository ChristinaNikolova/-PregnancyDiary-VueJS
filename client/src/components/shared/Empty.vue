<script setup>
const props = defineProps({
  element: {
    type: String,
    default: 'Elements',
  },
});
</script>

<template>
  <div class="empty-wrapper">
    <h2 class="empty-title">
      No {{ props.element }} yet
    </h2>
  </div>
</template>

<style scoped>
.empty-wrapper {
  margin-bottom: 180px;
}
</style>
