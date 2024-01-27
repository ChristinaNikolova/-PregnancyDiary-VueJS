<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required, url } from '@vuelidate/validators';
import categoriesService from '../../../services/categories';
import { formNames } from '../../../utils/constants/global';
import { global } from '../../../utils/constants/error';
import { article } from '../../../utils/constants/model';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      picture: '',
      category: '',
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
const title = `${props.formName} Article`;
const data = reactive(props.initialData);
const isDisabled = ref(props.initialDisabled);
const categories = ref([]);

onMounted(() => {
  categoriesService
    .all()
    .then(res => categories.value = res)
    .catch(err => console.error(err));
});

const rules = computed(() => ({
  title: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.TITLE(article.TITLE_MIN_LEN, article.TITLE_MAX_LEN), minLength(article.TITLE_MIN_LEN)),
    maxLength: helpers.withMessage(global.TITLE(article.TITLE_MIN_LEN, article.TITLE_MAX_LEN), maxLength(article.TITLE_MAX_LEN)),
  },
  content: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.CONTENT(article.CONTENT_MIN_LEN, article.CONTENT_MAX_LEN), minLength(article.CONTENT_MIN_LEN)),
    maxLength: helpers.withMessage(global.CONTENT(article.CONTENT_MIN_LEN, article.CONTENT_MAX_LEN), maxLength(article.CONTENT_MAX_LEN)),
  },
  picture: {
    required: helpers.withMessage(global.REQUIRED, required),
    url: helpers.withMessage(global.URL, url),
  },
  category: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.title.$invalid || v$.value.content.$invalid || v$.value.picture.$invalid || v$.value.category.$invalid;
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
  emit('onSubmitHandler', data.title, data.content, data.picture, data.category);
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
        v-model.trim="v$.title.$model"
        :errors="v$?.title.$errors"
        name="title"
        label="Title"
      />
      <AppTextarea
        v-model.trim="v$.content.$model"
        :errors="v$?.content.$errors"
        name="content"
        label="Content"
        rows="15"
      />
      <AppInput
        v-model.trim="v$.picture.$model"
        :errors="v$?.picture.$errors"
        name="picture"
        label="Picture / URL"
      />
      <AppSelect
        v-model.trim="v$.category.$model"
        :errors="v$?.category.$errors"
        name="category"
        label="Category"
        :collection="categories"
      />
      <slot name="buttons" />
    </form>
  </section>
</template>
