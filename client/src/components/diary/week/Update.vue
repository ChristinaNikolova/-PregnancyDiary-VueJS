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
      data.value.myWeight = res.myWeight ? res.myWeight.toString() : '0';
      data.value.myBellySize = res.myBellySize ? res.myBellySize.toString() : '0';
      data.value.babyWeight = res.babyWeight ? res.babyWeight.toString() : '0';
      data.value.babyHeight = res.babyHeight ? res.babyHeight.toString() : '0';
    })
    .catch(err => console.error(err));
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
