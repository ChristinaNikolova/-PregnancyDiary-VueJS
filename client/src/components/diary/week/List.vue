<script setup>
import { trimesters } from '../../../utils/constants/global';
import Single from './Single.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'First',
  },
  weeks: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="diary-details-weeks-trimester-wrapper">
    <h4 class="diary-details-weeks-trimester-title section-title">
      {{ props.title }} Trimester
    </h4>
    <ul class="diary-details-weeks-trimester-ul">
      <template v-for="w in props.weeks" :key="w.id">
        <Single v-if="w.trimester === trimesters[props.title.toUpperCase()]" :week="w" />
      </template>
    </ul>
  </div>
</template>

<style scoped>
.diary-details-weeks-trimester-wrapper {
  margin-bottom: 100px;
}

.diary-details-weeks-trimester-title {
  font-size: 30px;
  margin-bottom: 40px;
}

.diary-details-weeks-trimester-ul {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
