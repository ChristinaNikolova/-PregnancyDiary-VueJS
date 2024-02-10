<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formNames } from '../../../utils/constants/global';
import momentsService from '../../../services/moments';
import Form from './Form.vue';

const route = useRoute();
const router = useRouter();
const momentId = route.params.momentId;
const weekId = route.params.weekId;
const formName = formNames.UPDATE;
const data = ref({
  date: '',
  title: '',
  content: '',
});
const serverError = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  momentsService
    .getById(momentId)
    .then((res) => {
      data.value.date = res.date;
      data.value.title = res.title;
      data.value.content = res.content;
    })
    .catch(err => console.err(err));
});

function onSubmitHandler(date, title, content) {
  momentsService
    .update(momentId, date, title, content)
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
  router.push({ path: `/diary/week/${weekId}` });
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
