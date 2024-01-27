<script setup>
import { computed, onUpdated, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { formNames, genders } from '../../utils/constants/global';
import { global } from '../../utils/constants/error';
import diary from '../../utils/validators/diary';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
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
  isDisabled.value = v$.value.positiveTestDate.$invalid || v$.value.dueDate.$invalid || v$.value.gender.$invalid;
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
  emit('onSubmitHandler', data.positiveTestDate, data.dueDate, data.gender.toLowerCase());
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
