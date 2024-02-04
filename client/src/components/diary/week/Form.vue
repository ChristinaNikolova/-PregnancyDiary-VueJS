<script setup>
import { onUpdated, reactive, ref } from 'vue';
import { formNames, moods } from '../../../utils/constants/global';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      mood: [],
      myWeight: '',
      myBellySize: '',
      babyWeight: '',
      babyHeight: '',
    }),
  },
  serverError: {
    type: Array,
  },
  formName: {
    type: String,
    default: formNames.CREATE,
  },
});
const emit = defineEmits(['onSubmitHandler']);
const data = reactive(props.initialData);
const title = ref(`${props.formName} week `);
const errors = ref([]);
const orderedMoods = moods.sort();

onUpdated(() => {
  errors.value = props.serverError;
  title.value = `${props.formName} week ${props.initialData.title}`;
});

async function onSubmitFormHandler() {
  emit('onSubmitHandler', data.mood, data.myWeight, data.myBellySize, data.babyWeight, data.babyHeight);
};
</script>

<template>
  <section class="form-section">
    <AppTitle
      :title="title"
      image="/images/martha-brook-personalised-stationery-personalised-pregnancy-journal-8.webp"
      text="diary-week"
      class-name="form-title"
    />
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <form class="form" @submit.prevent="onSubmitFormHandler">
      <AppInput
        v-model.trim="data.myWeight"
        name="myWeight"
        type="number"
        label="My weight in kg"
      />
      <AppInput
        v-model.trim="data.myBellySize"
        name="myBellySize"
        type="number"
        label="My belly size in cm"
      />
      <AppInput
        v-model.trim="data.babyWeight"
        name="babyWeight"
        type="number"
        label="Baby's weight in gramms"
      />
      <AppInput
        v-model.trim="data.babyHeight"
        name="babyHeight"
        type="number"
        label="Baby's height in cm"
      />
      <div class="checkbox-form-wrapper">
        <label class="checkbox-label">Moods:</label>
        <div class="checkboxes-wrapper">
          <div v-for="m in orderedMoods" :key="m" class="checkbox-wrapper">
            <input
              :id="m"
              v-model="data.mood"
              type="checkbox"
              :name="m"
              :value="m"
            >
            <label :for="m">{{ m }}</label>
          </div>
        </div>
      </div>
      <slot name="buttons" />
    </form>
  </section>
</template>
