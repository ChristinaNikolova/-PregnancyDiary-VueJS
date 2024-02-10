<script setup>
import { computed, onUpdated, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { formNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { moment as models } from '../../../utils/constants/model';
import date from '../../../utils/validators/date';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      date: '',
      title: '',
      content: '',
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
const title = `${props.formName} Moment`;
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);
const errors = ref([]);

onUpdated(() => {
  errors.value = props.serverError;
});

const rules = computed(() => ({
  date: {
    required: helpers.withMessage(global.REQUIRED, required),
    validDate: helpers.withMessage(global.DATE, date.validDate),
  },
  title: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), minLength(models.TITLE_MIN_LEN)),
    maxLength: helpers.withMessage(global.TITLE(models.TITLE_MIN_LEN, models.TITLE_MAX_LEN), maxLength(models.TITLE_MAX_LEN)),
  },
  content: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.DESC(models.CONTENT_MIN_LEN, models.CONTENT_MAX_LEN), minLength(models.CONTENT_MIN_LEN)),
    maxLength: helpers.withMessage(global.DESC(models.CONTENT_MIN_LEN, models.CONTENT_MAX_LEN), maxLength(models.CONTENT_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.date.$invalid || v$.value.title.$invalid || v$.value.content.$invalid;
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
  emit('onSubmitHandler', data.date, data.title, data.content);
};
</script>

<template>
  <section class="form-section">
    <AppTitle
      :title="title"
      image="/images/20210430_122731_1024x1024_2x_8445cd3e-8153-497c-8dfc-128935d1fb53.webp"
      text="diary-moment"
      class-name="form-title"
    />
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <form class="form" @submit.prevent="onSubmitFormHandler">
      <AppInput
        v-model.trim="v$.date.$model"
        :errors="v$?.date.$errors"
        name="date"
        type="text"
        label="Date"
      />
      <AppInput
        v-model.trim="v$.title.$model"
        :errors="v$?.title.$errors"
        name="title"
        type="text"
        label="Title"
      />
      <AppTextarea
        v-model.trim="v$.content.$model"
        :errors="v$?.content.$errors"
        name="content"
        label="Content"
        rows="15"
      />
      <slot name="buttons" />
    </form>
  </section>
</template>
