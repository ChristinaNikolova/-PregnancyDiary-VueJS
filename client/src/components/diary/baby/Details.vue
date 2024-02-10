<script setup>
import { computed, ref } from 'vue';
import { genders } from '../../../utils/constants/global';

const props = defineProps({
  baby: {
    type: Object,
    default: () => {},
  },
});
const isHovering = ref(false);

const getGenderColor = computed(() => {
  return props.baby.gender === genders.BOY
    ? 'diary-details-baby-info cloud baby-boy'
    : 'diary-details-baby-info cloud baby-girl';
});

const getGenderShadow = computed(() => {
  return props.baby.gender === genders.BOY
    ? 'diary-details-baby-picture-wrapper boy-shadow'
    : 'diary-details-baby-picture-wrapper girl-shadow';
});

function onUpdate() {
  console.log('update');
}

function onMouseEnter() {
  isHovering.value = true;
};

function onMouseLeave() {
  isHovering.value = false;
};
</script>

<template>
  <section
    class="diary-details-baby"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="diary-details-baby-title-wrapper">
      <h3 class="section-title">
        Hello, Baby {{ props.baby.gender }} {{ props.baby.name }}!
      </h3>
      <i v-if="isHovering" class="fa-solid fa-pen" @click="onUpdate()" />
    </div>
    <div class="diary-details-baby-wrapper">
      <div class="diary-details-baby-info-wrapper">
        <p :class="getGenderColor">
          Birthdate: <span class="diary-details-baby-info-baby">{{ props.baby.birthDate }}</span>
        </p>
        <p :class="getGenderColor">
          Birthtime: <span class="diary-details-baby-info-baby">{{ props.baby.birthTime }}</span>
        </p>
        <p :class="getGenderColor">
          Height: <span class="diary-details-baby-info-baby">{{ props.baby.height }} cm</span>
        </p>
        <p :class="getGenderColor">
          Weight: <span class="diary-details-baby-info-baby">{{ props.baby.weight }} gramms</span>
        </p>
      </div>
      <div :class="getGenderShadow">
        <img class="diary-details-baby-picture" :src="props.baby.picture" :alt="props.baby.name">
      </div>
    </div>
  </section>
</template>

<style scoped>
.diary-details-baby {
  background-color: var(--clr-cream-bg);
  color: var(--clr-white);
  padding-top: 80px;
  padding-bottom: 120px;
  margin-bottom: 200px;
}

.diary-details-baby-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: var(--clr-black);
}

.diary-details-baby-title-wrapper .section-title {
  margin-bottom: unset;
}

.diary-details-baby-title-wrapper i:hover {
  cursor: pointer;
}

.diary-details-baby-wrapper {
  margin-top: 160px;
}

.diary-details-baby-picture-wrapper {
  width: 600px;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;
}

.diary-details-baby-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.diary-details-baby-info-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
}

.diary-details-baby-info-baby {
  font-weight: 700;
  text-transform: lowercase;
  margin-left: 8px;
}
</style>
