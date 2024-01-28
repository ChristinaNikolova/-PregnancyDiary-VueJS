<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { diaryPictures, genders } from '../../utils/constants/global';
import diariesService from '../../services/diaries';

const props = defineProps({
  diary: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(['finish']);
const router = useRouter();
const isHovering = ref(false);

const getImage = computed(() => {
  let image = '';
  if (props.diary.gender === genders.BOY) {
    image = diaryPictures.BOY;
  }
  else if (props.diary.gender === genders.GIRL) {
    image = diaryPictures.GIRL;
  }
  else if (props.diary.gender === genders.UNKNOWN) {
    image = diaryPictures.UNKNOWN;
  }
  else if (props.diary.gender === genders.SURPRICE) {
    image = diaryPictures.SURPRICE;
  }
  return image;
});

function onDelete() {
  diariesService
    .deleteById(props.diary.id)
    .then(() => {
      emit('finish');
    })
    .catch(err => console.error(err));
}

function onUpdate() {
  router.push(`/diary/update/${props.diary.id}`);
}

function navigateToDetails() {
  router.push(`/diary/${props.diary.id}`);
};

function onMouseEnter() {
  isHovering.value = true;
};

function onMouseLeave() {
  isHovering.value = false;
};
</script>

<template>
  <li
    class="single-diary-li"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="navigateToDetails"
  >
    <div class="single-diary-li-img-wrapper">
      <img class="single-diary-li-img" :src="getImage" alt="diary-image">
      <div class="single-diary-li-img-content-wrapper">
        <img class="single-diary-li-img-icon" src="/images/1701.png" alt="stork-with-baby">
        <p class="single-diary-li-img-text">
          Due Date: {{ props.diary.dueDate }}
        </p>
        <div v-if="isHovering" class="single-diary-li-img-icons-wrapper">
          <i class="fa-solid fa-pen" @click.stop="onUpdate()" />
          <i class="fa-solid fa-trash" @click.stop="onDelete" />
        </div>
      </div>
    </div>
    <div class="single-diary-li-content-wrapper">
      <h3 class="single-diary-li-content-title">
        {{ props.diary.title }}
      </h3>
      <p class="single-diary-li-content-text">
        {{ props.diary.description }}
      </p>
    </div>
  </li>
</template>

<style scoped>
.single-diary-li {
  display: flex;
  align-items: center;
  gap: 30px;
  width: 80%;
}

.single-diary-li:hover {
  cursor: pointer;
  transform: scale(1.04);
  transition: all .6s;
}

.single-diary-li-img-wrapper {
  width: 80%;
  background-color: var(--clr-grey);
  padding: 50px 10px 20px 10px;
}

.single-diary-li-img {
  width: 600px;
  height: 410px;
  object-fit: cover;
}

.single-diary-li-img-content-wrapper {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 10px;
}

.single-diary-li-img-text {
  text-transform: uppercase;
  font-size: 14px;
  margin-top: 12px;
  font-weight: 500;
}

.single-diary-li-img-icon {
  width: 30px;
  height: 20px;
  object-fit: cover;
}

.single-diary-li-content-wrapper {
  width: 40%;
  text-align: justify;
}

.single-diary-li-content-title {
  text-transform: uppercase;
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 8px;
}

.single-diary-li-content-text {
  font-size: 18px;
}

.single-diary-li-img-icons-wrapper {
  font-size: 14px;
  color: var(--clr-brown);
}

.single-diary-li-img-icons-wrapper .fa-pen {
  margin-right: 6px;
}
</style>
