<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { trimesters } from '../../utils/constants/global';
import diariesService from '../../services/diaries';

const route = useRoute();
const diaryId = route.params.id;
const diary = ref({});

onMounted(() => {
  diariesService
    .getById(diaryId)
    .then((res) => {
      diary.value = res;
      console.log(diary.value);
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="diary-details">
    <Jumbo
      image="/images/personalised+pregnancy+journal.jpg"
      text="diary"
    />
    <h2 class="section-title">
      {{ diary.title }}
    </h2>
    <p class="diary-details-description">
      {{ diary.description }}
    </p>
    <section class="diary-details-info">
      <div class="diary-details-info-positive-test-date">
        Positive Test: {{ diary.positiveTestDate }}
      </div>
      <div class="diary-details-info-due-date">
        Due Date: {{ diary.dueDate }}
      </div>
      <div class="diary-details-info-gender">
        Gender: <br>{{ diary.gender }}
      </div>
    </section>
    <section class="diary-details-weeks">
      <h3 class="section-title">
        Pregnancy Week by Week
      </h3>
      <p class="diary-details-weeks-content">
        Get Excited for Every Milestone: Our “Pregnancy Week by Week” articles provide an in-depth look at the incredible journey of nurturing new life inside your body. Each week, we’ll take you through the developmental milestones your baby is reaching, as well as the physical and emotional changes you can expect.
      </p>
      <div class="diary-details-weeks-trimester-wrapper">
        <h4 class="diary-details-weeks-trimester-title section-title">
          First Trimester
        </h4>
        <ul class="diary-details-weeks-trimester-ul">
          <template v-for="w in diary.weeks">
            <li v-if="w.trimester === trimesters.FIRST" :key="w.id" class="diary-details-weeks-trimester-li">
              <img class="diary-details-weeks-trimester-li-img" :src="`/images/weeks/${w.title}.jpg`" :alt="`${w.title}-week`">
              <h6 class="diary-details-weeks-trimester-li-title">
                {{ w.title }} week pregnant
              </h6>
              <p class="diary-details-weeks-trimester-li-content">
                {{ w.subTitle }}
              </p>
            </li>
          </template>
        </ul>
      </div>
      <div class="diary-details-weeks-trimester-wrapper">
        <h4 class="diary-details-weeks-trimester-title section-title">
          Second Trimester
        </h4>
        <ul class="diary-details-weeks-trimester-ul">
          <template v-for="w in diary.weeks">
            <li v-if="w.trimester === trimesters.SECOND" :key="w.id" class="diary-details-weeks-trimester-li">
              <img class="diary-details-weeks-trimester-li-img" :src="`/images/weeks/${w.title}.jpg`" :alt="`${w.title}-week`">
              <h6 class="diary-details-weeks-trimester-li-title">
                {{ w.title }} week pregnant
              </h6>
              <p class="diary-details-weeks-trimester-li-content">
                {{ w.subTitle }}
              </p>
            </li>
          </template>
        </ul>
      </div>
      <div class="diary-details-weeks-trimester-wrapper">
        <h4 class="diary-details-weeks-trimester-title section-title">
          Third Trimester
        </h4>
        <ul class="diary-details-weeks-trimester-ul">
          <template v-for="w in diary.weeks">
            <li v-if="w.trimester === trimesters.THIRD" :key="w.id" class="diary-details-weeks-trimester-li">
              <img class="diary-details-weeks-trimester-li-img" :src="`/images/weeks/${w.title}.jpg`" :alt="`${w.title}-week`">
              <h6 class="diary-details-weeks-trimester-li-title">
                {{ w.title }} week pregnant
              </h6>
              <p class="diary-details-weeks-trimester-li-content">
                {{ w.subTitle }}
              </p>
            </li>
          </template>
        </ul>
      </div>
    </section>
  </section>
</template>

<style scoped>
.diary-details {
  background-color: var(--clr-light-brown);
  color: var(--clr-white);
}

.diary-details h2.section-title {
  color: var(--clr-white);
}

.diary-details-description {
  text-align: center;
  font-size: 18px;
  text-transform: lowercase;
  line-height: 2;
  letter-spacing: 1.1px;
  margin-bottom: 150px;
  padding-left: 50px;
  padding-right: 50px;
}

.diary-details-info {
  display: flex;
  justify-content: space-evenly;
  font-size: 28px;
  font-weight: 600;
  color: var(--clr-brown);
  margin-bottom: 200px;
}

.diary-details-info-positive-test-date,
.diary-details-info-due-date,
 .diary-details-info-gender {
  width: 400px;
  background-color: var(--clr-cream-bg);
  padding: 100px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.33);
}

.diary-details-info-positive-test-date {
  border-radius: 70% 70% 70% 50% / 40% 60% 80% 80%;;
}

.diary-details-info-due-date {
  border-radius: 30% 70% 20% 40% / 60% 40% 60% 40%;
}

.diary-details-info-gender {
  border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
}

.diary-details-weeks {
  background-color: var(--clr-cream-bl);
  color: var(--clr-dark-grey);
  padding-top: 60px;
  padding-bottom: 60px;
}

.diary-details h3.section-title {
  font-size: 36px;
  margin-bottom: 40px;
}

.diary-details-weeks-content {
  text-align: center;
  font-size: 18px;
  text-transform: lowercase;
  line-height: 2;
  letter-spacing: 1.1px;
  margin-bottom: 80px;
  padding-left: 50px;
  padding-right: 50px;
}
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

.diary-details-weeks-trimester-li {
  width: 30%;
  width: 250px;
  height: 250px;
  margin-bottom: 90px;
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
