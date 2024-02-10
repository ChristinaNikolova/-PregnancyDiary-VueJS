<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import weeksService from '../../../services/weeks';
import forms from '../../../utils/helpers/forms';
import All from '../mood/All.vue';

const route = useRoute();
const router = useRouter();
const weekId = route.params.id;
const week = ref({});
const isHovering = ref(false);

// todo update css + html moments
// todo delete moment
// todo update moment
// todo order moments by date
onMounted(() => {
  weeksService
    .getById(weekId)
    .then((res) => {
      week.value = res;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
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
    <All :moods="week.mood" />
    <section class="week-details-moments-wrapper">
      <h4 class="week-details-title section-title">
        My Moments
      </h4>
      <div class="week-details-moments-btn-wrapper">
        <AppButton name="Add moment" :link="`/diary/${week.id}/moment/create`" :is-primary="false" />
      </div>
      <ul v-if="week?.moments?.length" class="week-details-moments-ul">
        <li v-for="m in week.moments" :key="m.id" class="week-details-moments-li">
          <h5 class="week-details-moments-li-title">
            {{ m.title }}
          </h5>
          <p class="week-details-moments-li-date">
            {{ m.date }}
          </p>
          <p class="week-details-moments-li-content">
            {{ m.content }}
          </p>
          <div class="heart-wrapper">
            <div class="heart" />
            <div class="heart" />
            <div class="heart" />
          </div>
        </li>
      </ul>
      <Empty v-else element="moments" />
    </section>
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

.week-details-moments-li {
  position: relative;
  text-align: start;
  margin-bottom: 40px;
}

.week-details-moments-li:last-of-type {
  margin-bottom: 40px;
}

.week-details-moments-li-title {
  font-size: 24px;
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

.heart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.heart {
  display: inline-block;
  width: 24px;
  margin: 50px 2px 0px 2px;
  aspect-ratio: 1;
  border-image: radial-gradient(var(--clr-cream-bg) 69%, #0000 70%) 84.5%/50%;
  clip-path: polygon(-41% 0, 50% 91%, 141% 0);
}
</style>
