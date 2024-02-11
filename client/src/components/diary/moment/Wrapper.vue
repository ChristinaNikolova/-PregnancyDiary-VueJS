<script setup>
const props = defineProps({
  isLenght: {
    type: Boolean,
    default: false,
  },
  weekId: {
    type: String,
  },
});
</script>

<template>
  <section class="week-details-moments-wrapper">
    <h4 class="week-details-title section-title">
      My Moments
    </h4>
    <div class="week-details-moments-btn-wrapper">
      <AppButton name="Add moment" :link="`/diary/${props.weekId}/moment/create`" :is-primary="false" />
    </div>
    <slot
      v-if="props.isLenght"
      name="allMoments"
    />
    <Empty
      v-else
      element="moments"
    />
  </section>
</template>

<style scoped>
.week-details-moments-wrapper {
  background-color: var(--clr-light-brown);
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 100px;
}

.week-details-moments-wrapper .week-details-title {
  color: var(--clr-white);
  margin-bottom: 90px;
}

.week-details-moments-wrapper :deep(.empty-title::after) {
  border-color: var(--clr-white);
}

.week-details-moments-btn-wrapper {
  margin-bottom: 80px;
}
</style>
