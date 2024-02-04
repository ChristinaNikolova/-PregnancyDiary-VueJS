<script setup>
import Single from './Single.vue';

const props = defineProps({
  moods: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="week-details-moods-wrapper">
    <h4 class="week-details-moods-title section-title">
      My Mood
    </h4>
    <ul v-if="props.moods.length" class="week-details-moods">
      <Single v-for="m in props.moods" :key="m" :mood="m" />
    </ul>
    <Empty v-else element="moods" />
  </section>
</template>

<style scoped>
.week-details-moods-wrapper {
  background-color: var(--clr-grey);
  color: var(--clr-brown);
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 100px;
}

.week-details-moods-title {
  font-size: 36px;
  text-transform: uppercase;
  margin-bottom: 150px;
}

.week-details-moods {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
</style>
