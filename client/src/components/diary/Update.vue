<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import diariesService from '../../services/diaries';
import { formNames } from '../../utils/constants/global';
import Form from './Form.vue';

const route = useRoute();
const router = useRouter();
const diaryId = route.params.id;
const formName = formNames.UPDATE;
const data = ref({
  title: '',
  description: '',
  positiveTestDate: '',
  dueDate: '',
  gender: '',
});
const serverError = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  diariesService
    .getById(diaryId)
    .then((res) => {
      data.value.title = res.title;
      data.value.description = res.description;
      data.value.positiveTestDate = res.positiveTestDate;
      data.value.dueDate = res.dueDate;
      data.value.gender = res.gender.toUpperCase();
    })
    .catch(err => console.err(err));
});

function onSubmitHandler(title, description, positiveTestDate, dueDate, gender) {
  diariesService
    .update(diaryId, title, description, positiveTestDate, dueDate, gender)
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
  router.push({ path: '/diary' });
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
