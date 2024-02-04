<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import momentsService from "../../../services/moments";
import Form from "./Form.vue";

const router = useRouter();
const route = useRoute();
const weekId = route.params.weekId;
const data = ref({
  date: "",
  title: "",
  content: "",
});
const serverError = ref([]);
const isDisabled = ref(true);

function onSubmitHandler(date, title, content) {
  momentsService
    .create(weekId, date, title, content)
    .then((res) => {
      if (res.message) {
        serverError.value = res.message;
        return;
      }
      serverError.value = [];
      onCancelFormHandler();
    })
    .catch((err) => console.error(err));
}

function onCancelFormHandler() {
  router.push({ path: `/diary/week/${weekId}` });
}

function checkIsDisabled(disable) {
  isDisabled.value = !!disable;
}
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
      <FormButton
        :is-disabled="isDisabled"
        @on-cancel-form-handler="onCancelFormHandler"
      />
    </template>
  </Form>
</template>
