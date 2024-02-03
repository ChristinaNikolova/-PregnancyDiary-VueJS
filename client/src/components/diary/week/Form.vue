<script setup>
import { onUpdated, reactive, ref, watch } from 'vue';
import { formNames } from '../../../utils/constants/global';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      mood: '',
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
  initialDisabled: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['onSubmitHandler', 'checkIsDisabled']);
// todo week update
// todo test server error
const data = reactive(props.initialData);
const title = `${props.formName} week ${props.initialData.title}`;
const isDisabled = ref(props.initialDisabled);
const errors = ref([]);

onUpdated(() => {
  errors.value = props.serverError;
});

watch(errors, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
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
      <slot name="buttons" />
    </form>
  </section>
</template>
