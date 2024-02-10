<script setup>
const props = defineProps({
  moment: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <li class="week-details-moments-li">
    <h5 class="week-details-moments-li-title">
      {{ props.moment.title }}
    </h5>
    <p class="week-details-moments-li-date">
      {{ props.moment.date }}
    </p>
    <p class="week-details-moments-li-content">
      {{ props.moment.content }}
    </p>
    <div class="heart-wrapper">
      <div class="heart" />
      <div class="heart" />
      <div class="heart" />
    </div>
  </li>
</template>

<style scoped>
.week-details-moments-li {
  position: relative;
  text-align: start;
  margin-bottom: 40px;
}

.week-details-moments-li:last-of-type {
  margin-bottom: 40px;
}

.week-details-moments-li-title {
  font-size: 22px;
  font-weight: 500;
}

.week-details-moments-li-date {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.week-details-moments-li-content {
  font-size: 18px;
  line-height: 2;
  text-transform: initial;
}
</style>
