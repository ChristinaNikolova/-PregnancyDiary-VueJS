<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import babiesService from '../../../services/babies';
import Form from './Form.vue';

const router = useRouter();
const route = useRoute();
const diaryId = route.params.id;
const data = ref({
  name: '',
  gender: '',
  birthDate: '',
  birthTime: '',
  height: '',
  weight: '',
  picture: '',
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(name, gender, birthDate, birthTime, height, weight, picture) {
  babiesService
    .create(diaryId, name, gender, birthDate, birthTime, height, weight, picture)
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
  router.push({ path: `/diary/${diaryId}` });
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
