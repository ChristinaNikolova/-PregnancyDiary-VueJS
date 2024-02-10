<script setup>
import Single from './Single.vue';

const props = defineProps({
  moments: {
    type: Array,
    default: () => [],
  },
  weekId: {
    type: String,
  },
});
const emit = defineEmits(['finish']);

function deleteHandler() {
  emit('finish');
}
</script>

<template>
  <ul class="week-details-moments-ul">
    <Single
      v-for="m in props.moments"
      :key="m.id"
      :moment="m"
      :week-id="props.weekId"
      @delete-handler="deleteHandler"
    />
  </ul>
</template>
