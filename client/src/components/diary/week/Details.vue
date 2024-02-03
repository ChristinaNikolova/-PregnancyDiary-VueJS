<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import weeksService from '../../../services/weeks';
import forms from '../../../utils/helpers/forms';

const route = useRoute();
const weekId = route.params.id;
const week = ref({});

// todo back button + diaryId
onMounted(() => {
  weeksService
    .getById(weekId)
    .then((res) => {
      week.value = res;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="week-details">
    <Jumbo
      image="/images/personalised+pregnancy+journal.jpg"
      text="diary"
    />
    <div class="week-details-titles-wrapper">
      <h2 class="section-title">
        Week {{ week.title }}
      </h2>
      <h4 class="week-details-sub-title">
        {{ week.subTitle }}
      </h4>
    </div>
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
        {{ week.myWeight }}
        <span class="week-details-info-dimension">kg</span>
      </div>
      <div class="week-details-info-my-belly-size">
        Belly size:
        <br>
        {{ week.myBellySize }}
        <span class="week-details-info-dimension">cm</span>
      </div>
      <div class="week-details-info-baby-weight">
        Baby's weight:
        <br>
        {{ week.babyWeight }}
        <span class="week-details-info-dimension">gramm</span>
      </div>
      <div class="week-details-info-baby-height">
        Baby's height:
        <br>
        {{ week.babyHeight }}
        <span class="week-details-info-dimension">cm</span>
      </div>
    </div>
    <section class="week-details-moods-wrapper">
      <h4 class="week-details-title section-title">
        My Mood
      </h4>
      <div v-if="week?.mood?.length" class="week-details-moods">
        <div class="week-details-mood">
          HAPPY
        </div>
        <div class="week-details-mood">
          SAD
        </div>
        <div class="week-details-mood">
          melancholic
        </div>
        <div class="week-details-mood">
          surpised
        </div>
        <div class="week-details-mood">
          surpised
        </div>
        <div class="week-details-mood">
          surpised
        </div>
      </div>
      <Empty v-else element="moods" />
    </section>
    <section class="week-details-moments-wrapper">
      <h4 class="week-details-title section-title">
        My Moments
      </h4>
      <div v-if="week?.moments?.length" class="week-details-moments" />
      <Empty v-else element="moments" />
    </section>
  </section>
</template>

<style scoped>
.week-details {
  background-color: var(--clr-light-brown);
  color: var(--clr-white);
}

.week-details-titles-wrapper {
  margin: 0 auto;
}

.week-details h2.section-title {
  color: var(--clr-white);
}

.week-details-sub-title {
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 60px;
}

.week-details-img-wrapper {
  margin: 0 auto 60px auto;
  width: 50%;
}

.week-details-img {
  width: 500px;
  height: 500px;
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

.week-details-moods-wrapper {
  background-color: var(--clr-grey);
  color: var(--clr-brown);
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 100px;
}

.week-details-title {
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

.week-details-mood {
  position: relative;
  width: 300px;
  height: 100px;
  border-radius: 100px / 50px;
  background-color: var(--clr-white);
  line-height: 100px;
  text-align: center;
  margin-bottom: 80px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.08);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.08);
}

.week-details-mood::before {
  position: absolute;
  content: "";
  top: -60px;
  left: 120px;
  width: 120px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--clr-white);
  line-height: 75px;
  text-align: center;
}

.week-details-mood::after {
  position: absolute;
  content: "";
  top: -20px;
  left: 60px;
  width: 100px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--clr-white);
  line-height: 75px;
  text-align: center;
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
}
.week-details-moments-wrapper :deep(.empty-title::after) {
  border-color: var(--clr-white);
}
</style>
