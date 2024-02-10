<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import momentsService from '../../../services/moments';

const props = defineProps({
  moment: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(['deleteHandler']);
const router = useRouter();
const isHovering = ref(false);

function onDelete() {
  momentsService
    .deleteById(props.moment.id)
    .then(() => emit('deleteHandler'))
    .catch(err => console.error(err));
}

function onUpdate() {
  router.push(``);
}

function onMouseEnter() {
  isHovering.value = true;
};

function onMouseLeave() {
  isHovering.value = false;
};
</script>

<template>
  <li
    class="week-details-moments-li"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="week-details-moments-li-title-wrapper">
      <h5 class="week-details-moments-li-title">
        {{ props.moment.title }}
      </h5>
      <i v-if="isHovering" class="fa-solid fa-pen" @click="onUpdate()" />
      <i v-if="isHovering" class="fa-solid fa-trash" @click="onDelete()" />
    </div>

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

.week-details-moments-li-title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.week-details-moments-li-title {
  font-size: 22px;
  font-weight: 500;
}

.week-details-moments-li-title-wrapper i {
  font-size: 14px;
}

.week-details-moments-li-title-wrapper i:hover {
  cursor: pointer;
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
