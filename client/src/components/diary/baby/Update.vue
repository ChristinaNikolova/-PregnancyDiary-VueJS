<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formNames } from '../../../utils/constants/global';
import babiesService from '../../../services/babies';
import Form from './Form.vue';

const route = useRoute();
const router = useRouter();
const babyId = route.params.babyId;
const diaryId = route.params.diaryId;
const formName = formNames.UPDATE;
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
const isDisabled = ref(false);

onMounted(() => {
  babiesService
    .getById(babyId)
    .then((res) => {
      data.value.name = res.name;
      data.value.gender = res.gender.toUpperCase();
      data.value.birthDate = res.birthDate;
      data.value.birthTime = res.birthTime;
      data.value.height = res.height.toString();
      data.value.weight = res.weight.toString();
      data.value.picture = res.picture;
    })
    .catch(err => console.err(err));
});

function onSubmitHandler(name, gender, birthDate, birthTime, height, weight, picture) {
  babiesService
    .update(babyId, name, gender, birthDate, birthTime, height, weight, picture)
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
    :form-name="formName"
    @on-submit-handler="onSubmitHandler"
    @check-is-disabled="checkIsDisabled"
  >
    <template #buttons>
      <FormButton :form-name="formName" :is-disabled="isDisabled" @on-cancel-form-handler="onCancelFormHandler" />
    </template>
  </Form>
</template>
