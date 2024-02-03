<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import weeksService from '../../../services/weeks';

const route = useRoute();
const weekId = route.params.id;
const week = ref({});

onMounted(() => {
  weeksService
    .getById(weekId)
    .then(res => week.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="week-details">
    <Jumbo
      image="/images/personalised+pregnancy+journal.jpg"
      text="diary"
    />
    <h2 class="section-title">
      Week {{ week.title }}
    </h2>
    <p class="week-details-description">
      {{ week.subTitle }}
    </p>
    <img :src="`/images/weeks/${week.title}.jpg`" :alt="`${week.title}-week`">
    <p class="week-details-description">
      {{ week.text }}
    </p>
    <section class="week-details-info">
      <div class="week-details-info-trimester">
        Trimester: {{ week.trimester }}
      </div>
      <div class="week-details-info-my-weight">
        My weight: {{ week.myWeight }}
      </div>
      <div class="week-details-info-my-belly-size">
        Belly size: {{ week.myBellySize }}
      </div>
      <div class="week-details-info-baby-weight">
        Baby's weight: {{ week.babyWeight }}
      </div>
      <div class="week-details-info-baby-height">
        Baby's height {{ week.babyHeight }}
      </div>
    </section>
    <section class="week-details-mood">
      mood
    </section>
  </section>
</template>

<style scoped>

</style>
