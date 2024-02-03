<script setup>
const props = defineProps({
  week: {
    type: Object,
    default: () => {},
  },
  diaryId: {
    type: String,
  },
});
</script>

<template>
  <li class="diary-details-weeks-trimester-li">
    <router-link :to="`/diary/${props.diaryId}/${props.week.id}`">
      <img class="diary-details-weeks-trimester-li-img" :src="`/images/weeks/${props.week.title}.jpg`" :alt="`${props.week.title}-week`">
      <h6 class="diary-details-weeks-trimester-li-title">
        {{ props.week.title }} week pregnant
      </h6>
      <p class="diary-details-weeks-trimester-li-content">
        {{ props.week.subTitle }}
      </p>
    </router-link>
  </li>
</template>

<style scoped>
.diary-details-weeks-trimester-li {
  width: 30%;
  width: 250px;
  height: 250px;
  margin-bottom: 110px;
}

.diary-details-weeks-trimester-li:hover {
  transform: scale(1.04);
  transition: all .6s;
}

.diary-details-weeks-trimester-li-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 100% 70% 65% 70%;
}

.diary-details-weeks-trimester-li-title {
  font-size: 14px;
  margin-bottom: 8px;
}

.diary-details-weeks-trimester-li-content {
  font-size: 14px;
}
</style>
