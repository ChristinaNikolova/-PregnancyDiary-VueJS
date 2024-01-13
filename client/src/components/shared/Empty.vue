<script setup>
const props = defineProps({
  element: {
    type: String,
    default: 'Elements',
  },
  noResult: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="empty-wrapper">
    <h2 v-if="!noResult" class="empty-title">
      No {{ props.element }} yet
    </h2>
    <h2 v-else class="empty-title">
      Nothing found
    </h2>
  </div>
</template>

<style scoped>
.empty-wrapper {
  margin-bottom: 180px;
}
</style>
