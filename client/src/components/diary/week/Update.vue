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
const isDisabled = ref(false);

onMounted(() => {
  weeksServices
    .getById(weekId)
    .then((res) => {
      data.value.title = res.title;
      data.value.mood = res.mood;
      data.value.myWeight = res.myWeight === 0 ? '' : res.myWeight;
      data.value.myBellySize = res.myBellySize === 0 ? '' : res.myBellySize;
      data.value.babyWeight = res.babyWeight === 0 ? '' : res.babyWeight;
      data.value.babyHeight = res.babyHeight === 0 ? '' : res.babyHeight;
    })
    .catch(err => console.err(err));
});

// todo order moods alphabetical
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
