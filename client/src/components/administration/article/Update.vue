<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import articlesService from '../../../services/articles';
import categoriesService from '../../../services/categories';
import { formNames } from '../../../utils/constants/global';
import Form from './Form.vue';

const route = useRoute();
const router = useRouter();
const articleId = route.params.id;
const formName = formNames.UPDATE;
const data = ref({
  title: '',
  content: '',
  picture: '',
  category: '',
});
const serverError = ref([]);
const isDisabled = ref(false);
const categories = ref([]);

onMounted(() => {
  articlesService
    .getById(articleId)
    .then((res) => {
      data.value.title = res.title;
      data.value.content = res.content;
      data.value.picture = res.picture;
      data.value.category = res.category;
    })
    .catch(err => console.err(err));

  categoriesService
    .all()
    .then(res => categories.value = res)
    .catch(err => console.error(err));
});

function onSubmitHandler(title, content, picture, category) {
  articlesService
    .update(articleId, title, content, picture, category)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      onCancelFormHandler();
    })
    .catch(err => console.error(err));
};

function onCancelFormHandler() {
  router.push({ path: '/administration/article' });
};

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
};
</script>

<template>
  <Form
    :initial-data="data"
    :server-error="serverError"
    :initial-disabled="isDisabled"
    :form-name="formName"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #buttons>
      <FormButton :form-name="formName" :is-disabled="isDisabled" @on-cancel-form-handler="onCancelFormHandler" />
    </template>
  </Form>
</template>
