<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import weeksServices from '../../../services/weeks';
import { formNames } from '../../../utils/constants/global';
import Form from './Form.vue';

const route = useRoute();
const router = useRouter();
const weekId = route.params.id;
const formName = formNames.UPDATE;
const data = ref({
  title: '',
  mood: [],
  myWeight: '',
  myBellySize: '',
  babyWeight: '',
  babyHeight: '',
});
const serverError = ref([]);

onMounted(() => {
  weeksServices
    .getById(weekId)
    .then((res) => {
      data.value.title = res.title;
      data.value.mood = res.mood;
      data.value.myWeight = res.myWeight.toString();
      data.value.myBellySize = res.myBellySize.toString();
      data.value.babyWeight = res.babyWeight.toString();
      data.value.babyHeight = res.babyHeight.toString();
    })
    .catch(err => console.err(err));
});

function onSubmitHandler(mood, myWeight, myBellySize, babyWeight, babyHeight) {
  weeksServices
    .update(weekId, mood, myWeight, myBellySize, babyWeight, babyHeight)
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
</script>

<template>
  <Form
    :initial-data="data"
    :server-error="serverError"
    :form-name="formName"
    @on-submit-handler="onSubmitHandler"
  >
    <template #buttons>
      <FormButton :form-name="formName" :is-disabled="false" @on-cancel-form-handler="onCancelFormHandler" />
    </template>
  </Form>
</template>
