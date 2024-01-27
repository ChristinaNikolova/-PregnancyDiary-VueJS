<script setup>
import { computed, onUpdated, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { formNames, genders } from '../../utils/constants/global';
import { global } from '../../utils/constants/error';
import { diary as models } from '../../utils/constants/model';
import diary from '../../utils/validators/diary';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      positiveTest: '',
      dueDate: '',
      gender: '',
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
const gender = Object.values(genders);
const title = `${props.formName} Diary`;
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);
const errors = ref([]);

onUpdated(() => {
  errors.value = props.serverError;
});

const rules = computed(() => ({
  title: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), minLength(models.TITLE_MIN_LEN)),
    maxLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), maxLength(models.TITLE_MAX_LEN)),
  },
  description: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.DESC(models.DESC_MIN_LEN, models.DESC_MAX_LEN), minLength(models.DESC_MIN_LEN)),
    maxLength: helpers.withMessage(global.DESC(models.DESC_MIN_LEN, models.DESC_MAX_LEN), maxLength(models.DESC_MAX_LEN)),
  },
  positiveTestDate: {
    required: helpers.withMessage(global.REQUIRED, required),
    validDate: helpers.withMessage(global.DATE, diary.validDate),
  },
  dueDate: {
    required: helpers.withMessage(global.REQUIRED, required),
    validDate: helpers.withMessage(global.DATE, diary.validDate),
  },
  gender: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.title.$invalid || v$.value.description.$invalid || v$.value.positiveTestDate.$invalid || v$.value.dueDate.$invalid || v$.value.gender.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(errors, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  emit('onSubmitHandler', data.title, data.description, data.positiveTestDate, data.dueDate, data.gender.toLowerCase());
};
</script>

<template>
  <section class="form-section">
    <AppTitle
      :title="title"
      image="/images/Pregnancy-Project-birth-1024x702.jpg"
      text="pregnant-woman-with-diary"
      class-name="form-title"
    />
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <form class="form" @submit.prevent="onSubmitFormHandler">
      <AppInput
        v-model.trim="v$.title.$model"
        :errors="v$?.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppTextarea
        v-model.trim="v$.description.$model"
        :errors="v$?.description.$errors"
        name="description"
        label="Description"
        rows="15"
      />
      <AppInput
        v-model.trim="v$.positiveTestDate.$model"
        :errors="v$?.positiveTestDate.$errors"
        name="positiveTestDate"
        type="text"
        label="Positive Test Date"
      />
      <AppInput
        v-model.trim="v$.dueDate.$model"
        :errors="v$?.dueDate.$errors"
        name="dueDate"
        type="text"
        label="Due Date"
      />
      <AppSelect
        v-model.trim="v$.gender.$model"
        :errors="v$?.gender.$errors"
        name="gender"
        label="Gender"
        :collection="gender"
      />
      <slot name="buttons" />
    </form>
  </section>
</template>
