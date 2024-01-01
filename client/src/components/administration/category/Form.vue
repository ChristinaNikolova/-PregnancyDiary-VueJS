<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required, url } from '@vuelidate/validators';
import { formNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { category } from '../../../utils/constants/model';

// todo remove picture
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      name: '',
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
const title = `${props.formName} Category`;
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);

const rules = computed(() => ({
  name: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.NAME(category.NAME_MIN_LEN, category.NAME_MAX_LEN), minLength(category.NAME_MIN_LEN)),
    maxLength: helpers.withMessage(global.NAME(category.NAME_MIN_LEN, category.NAME_MAX_LEN), maxLength(category.NAME_MAX_LEN)),
  },
  picture: {
    required: helpers.withMessage(global.REQUIRED, required),
    url: helpers.withMessage(global.URL, url),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.name.$invalid || v$.value.picture.$invalid;
  emit('checkIsDisabled', isDisabled.value);
}, { deep: true });

watch(props.serverError, () => {
  isDisabled.value = props.serverError.length;
  emit('checkIsDisabled', isDisabled.value);
});

async function onSubmitFormHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  emit('onSubmitHandler', data.name, data.picture);
};
</script>

<template>
  <section class="form-section">
    <AppTitle
      :title="title"
      image="/images/martha-brook-blog-post-brilliant-gifts-for-pregnant-women-pregnant-woman-sitting-on-bed-banner-1500x550.webp"
      text="administration-image"
      class-name="form-title"
    />
    <ServerError v-if="props.serverError.length" :errors="props.serverError" />
    <form class="form" @submit.prevent="onSubmitFormHandler">
      <AppInput
        v-model.trim="v$.name.$model"
        :errors="v$?.name.$errors"
        name="name"
        label="Name"
      />
      <AppInput
        v-model.trim="v$.picture.$model"
        :errors="v$?.picture.$errors"
        name="picture"
        label="Picture / URL"
      />
      <slot name="buttons" />
    </form>
  </section>
</template>
