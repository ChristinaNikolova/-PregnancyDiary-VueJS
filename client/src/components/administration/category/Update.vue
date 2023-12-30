<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import categoriesService from '../../../services/categories';
import { formNames } from '../../../utils/constants/global';
import Form from './Form.vue';

const route = useRoute();
const router = useRouter();
const categoryId = route.params.id;
const formName = formNames.UPDATE;
const data = ref({
  name: '',
  picture: '',
});
const serverError = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  categoriesService
    .getById(categoryId)
    .then((res) => {
      data.value.name = res.name;
      data.value.picture = res.picture;
    })
    .catch(err => console.err(err));
});

function onSubmitHandler(name, picture) {
  categoriesService
    .update(categoryId, name, picture)
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
    :form-name="formName"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #buttons>
      <FormButton :form-name="formName" :is-disabled="isDisabled" @on-cancel-form-handler="onCancelFormHandler" />
    </template>
  </Form>
</template>
