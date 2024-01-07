<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import categoriesService from '../../../services/categories';
import Form from './Form.vue';

const router = useRouter();
const data = ref({
  name: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(name) {
  categoriesService
    .create(name)
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
  router.push({ path: '/administration/category' });
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
