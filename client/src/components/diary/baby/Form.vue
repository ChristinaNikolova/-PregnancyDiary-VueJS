<script setup>
import { computed, onUpdated, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, minValue, required, url } from '@vuelidate/validators';
import { formNames, genders } from '../../../utils/constants/global';
import { baby as error, global } from '../../../utils/constants/error';
import { baby as models } from '../../../utils/constants/model';

import date from '../../../utils/validators/date';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      gender: '',
      birthDate: '',
      birthTime: '',
      height: '',
      weight: '',
      picture: '',
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
const gender = Object.values(genders).filter(g => g === genders.BOY || g === genders.GIRL).map(g => g.toUpperCase());
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);
const errors = ref([]);

onUpdated(() => {
  errors.value = props.serverError;
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.TITLE(models.NAME_MIN_LEN, models.NAME_MAX_LEN), minLength(models.NAME_MIN_LEN)),
    maxLength: helpers.withMessage(global.TITLE(models.NAME_MIN_LEN, models.NAME_MAX_LEN), maxLength(models.NAME_MAX_LEN)),
  },
  gender: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
  birthDate: {
    required: helpers.withMessage(global.REQUIRED, required),
    validDate: helpers.withMessage(global.DATE, date.validDate),
  },
  birthTime: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
  height: {
    required: helpers.withMessage(global.REQUIRED, required),
    minValue: helpers.withMessage(error.HEIGHT, minValue(models.HEIGHT_MIN)),
  },
  weight: {
    required: helpers.withMessage(global.REQUIRED, required),
    minValue: helpers.withMessage(error.WEIGHT, minValue(models.WEIGHT_MIN)),
  },
  picture: {
    required: helpers.withMessage(global.REQUIRED, required),
    url: helpers.withMessage(global.URL, url),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.name.$invalid || v$.value.gender.$invalid || v$.value.birthDate.$invalid || v$.value.birthTime.$invalid || v$.value.height.$invalid || v$.value.weight.$invalid || v$.value.picture.$invalid;
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
  emit('onSubmitHandler', data.name, data.gender.toLowerCase(), data.birthDate, data.birthTime, data.height, data.weight, data.picture);
};
</script>

<template>
  <section class="form-section">
    <AppTitle
      title="Baby is born"
      image="/images/Your-Babys-First-Checkup-hospital-722x406.jpg"
      text="new-born"
      class-name="form-title"
    />
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <form class="form" @submit.prevent="onSubmitFormHandler">
      <AppInput
        v-model.trim="v$.name.$model"
        :errors="v$?.name.$errors"
        name="name"
        type="text"
        label="Name"
      />
      <AppSelect
        v-model.trim="v$.gender.$model"
        :errors="v$?.gender.$errors"
        name="gender"
        label="Gender"
        :collection="gender"
      />
      <AppInput
        v-model.trim="v$.birthDate.$model"
        :errors="v$?.birthDate.$errors"
        name="birthDate"
        type="text"
        label="Birth Date"
      />
      <AppInput
        v-model.trim="v$.birthTime.$model"
        :errors="v$?.birthTime.$errors"
        name="birthTime"
        type="text"
        label="Birth Time"
      />
      <AppInput
        v-model.trim="v$.height.$model"
        :errors="v$?.height.$errors"
        name="height"
        type="text"
        label="Height in cm"
      />
      <AppInput
        v-model.trim="v$.weight.$model"
        :errors="v$?.weight.$errors"
        name="weight"
        type="text"
        label="Weight in gramms"
      />
      <AppInput
        v-model.trim="v$.picture.$model"
        :errors="v$?.picture.$errors"
        name="picture"
        type="text"
        label="Picture"
      />

      <slot name="buttons" />
    </form>
  </section>
</template>
