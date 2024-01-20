<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { global } from '../../../utils/constants/error';
import { comment } from '../../../utils/constants/model';
import commentsService from '../../../services/comments';

const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
});
const data = reactive({
  content: '',
});
const isDisabled = ref(true);
const serverError = ref([]);

const rules = computed(() => ({
  content: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(global.CONTENT(comment.CONTENT_MIN_LEN, comment.CONTENT_MAX_LEN), minLength(comment.CONTENT_MIN_LEN)),
    maxLength: helpers.withMessage(global.CONTENT(comment.CONTENT_MIN_LEN, comment.CONTENT_MAX_LEN), maxLength(comment.CONTENT_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.content.$invalid;
}, { deep: true });

watch(serverError, () => {
  isDisabled.value = !!serverError.value.length;
});

async function onSubmitHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  commentsService
    .create(data.content, props.articleId)
    .then((res) => {
      console.log(res);
    })
    .catch(err => console.error(err));
};
</script>

<template>
  <form class="form" @submit.prevent="onSubmitHandler">
    <AppTextarea
      v-model.trim="v$.content.$model"
      :errors="v$?.content.$errors"
      name="comment"
      label="Comment"
    />
    <button :disabled="isDisabled" type="submit" class="btn btn-primary">
      Comment
    </button>
  </form>
</template>

<style scoped></style>
