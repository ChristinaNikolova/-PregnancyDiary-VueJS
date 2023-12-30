<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import articlesService from '../../../services/articles';
import Form from './Form.vue';

const router = useRouter();
const data = ref({
  title: '',
  content: '',
  picture: '',
  category: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(title, content, picture, category) {
  articlesService
    .create(title, content, picture, category)
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
  router.push({ path: '/blog' });
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
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #buttons>
      <FormButton :is-disabled="isDisabled" @on-cancel-form-handler="onCancelFormHandler" />
    </template>
  </Form>
</template>

<style scoped>

</style>
