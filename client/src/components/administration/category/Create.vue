<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import categoriesService from '../../../services/categories';
import FormButton from '../../shared/buttons/Form.vue';
import Form from './Form.vue';

const router = useRouter();
const data = ref({
  name: '',
  picture: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(name, picture) {
  categoriesService
    .create(name, picture)
    .then((res) => {
      console.log('res', res);
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      router.push({ path: '/administration/category' });
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
