<script setup>
import Details from './Details.vue';

const props = defineProps({
  diaryId: {
    type: String,
  },
  isBabyBorn: {
    type: Boolean,
    default: false,
  },
  baby: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div v-if="!props.isBabyBorn" class="diary-details-button-wrapper">
    <AppButton name="Baby is born" :link="`/diary/${props.diaryId}/baby/create`" :is-primary="false" />
  </div>
  <Details v-else :baby="props.baby" :diary-id="diaryId" />
</template>

<style scoped>
.diary-details-button-wrapper {
  margin-bottom: 150px;
}
</style>
