<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import weeksService from '../../../services/weeks';
import forms from '../../../utils/helpers/forms';
import WrapperMoment from '../moment/Wrapper.vue';
import AllMoment from '../moment/All.vue';
import AllMode from '../mood/All.vue';

const route = useRoute();
const router = useRouter();
const weekId = route.params.id;
const week = ref({});
const isHovering = ref(false);

onMounted(() => {
  loadWeek();
});

function onUpdate() {
  router.push(`/diary/week/update/${weekId}`);
}

function onMouseEnter() {
  isHovering.value = true;
};

function onMouseLeave() {
  isHovering.value = false;
};

function loadWeek() {
  weeksService
    .getById(weekId)
    .then((res) => {
      week.value = res;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
}
</script>

<template>
  <section class="week-details">
    <Jumbo
      image="/images/personalised+pregnancy+journal.jpg"
      text="diary"
    />
    <div
      class="week-details-title-icon-wrapper"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <h2 class="section-title">
        Week {{ week.title }}
      </h2>
      <i v-if="isHovering" class="fa-solid fa-pen" @click.stop="onUpdate()" />
    </div>
    <h4 class="week-details-sub-title">
      {{ week.subTitle }}
    </h4>
    <div class="week-details-img-wrapper">
      <img class="week-details-img" :src="`/images/weeks/${week.title}.jpg`" :alt="`${week.title}-week`">
    </div>
    <p class="week-details-description">
      {{ week.text }}
    </p>
    <div class="week-details-info-wrapper">
      <div class="week-details-info-trimester">
        Trimester:
        <br>
        {{ week.trimester }}
      </div>
      <div class="week-details-info-my-weight">
        My weight:
        <br>
        {{ week.myWeight ? week.myWeight : 0 }}
        <span class="week-details-info-dimension">kg</span>
      </div>
      <div class="week-details-info-my-belly-size">
        Belly size:
        <br>
        {{ week.myBellySize ? week.myBellySize : 0 }}
        <span class="week-details-info-dimension">cm</span>
      </div>
      <div class="week-details-info-baby-weight">
        Baby's weight:
        <br>
        {{ week.babyWeight ? week.babyHeight : 0 }}
        <span class="week-details-info-dimension">gramms</span>
      </div>
      <div class="week-details-info-baby-height">
        Baby's height:
        <br>
        {{ week.babyHeight ? week.babyHeight : 0 }}
        <span class="week-details-info-dimension">cm</span>
      </div>
    </div>
    <AllMode :moods="week.mood" />
    <WrapperMoment :week-id="weekId" :moments="week.moments" :is-lenght="!!week.moments?.length">
      <template #allMoments>
        <AllMoment
          :moments="week.moments"
          :week-id="weekId"
          @finish="loadWeek"
        />
      </template>
    </WrapperMoment>
  </section>
</template>

<style scoped>
.week-details {
  background-color: var(--clr-light-brown);
  color: var(--clr-white);
}

.week-details-title-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin-bottom: 40px;
}

.week-details-title-icon-wrapper:hover {
  cursor: pointer;
}

.week-details-title-icon-wrapper .section-title {
  color: var(--clr-white);
  margin-bottom: unset;
}

.week-details-title-icon-wrapper i {
  font-size: 16px;
}

.week-details-sub-title {
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 60px;
}

.week-details-img-wrapper {
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto 80px auto;
}

.week-details-img {
  width: 100%;
  object-fit: cover;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
  border-radius: 100% 70% 65% 70%;
}

.week-details-description {
  text-align: center;
  font-size: 18px;
  text-transform: capitalize;
  line-height: 2;
  letter-spacing: 1.1px;
  margin-bottom: 120px;
  padding-left: 80px;
  padding-right: 80px;
}

.week-details-info-wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 70px;
  font-size: 28px;
  font-weight: 600;
  color: var(--clr-brown);
}

.week-details-info-trimester,
.week-details-info-my-weight,
.week-details-info-my-belly-size,
.week-details-info-baby-weight,
.week-details-info-baby-height {
  width: 400px;
  background-color: var(--clr-cream-bg);
  padding: 100px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
  border-radius: 70% 70% 70% 50% / 40% 60% 80% 80%;
  margin-bottom: 70px;
}

.week-details-info-dimension {
  text-transform: lowercase;
}

.week-details-title {
  font-size: 36px;
  text-transform: uppercase;
  margin-bottom: 150px;
}
</style>
