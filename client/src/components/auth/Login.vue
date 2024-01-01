<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';
import { useAuthStore } from '../../store/auth';
import authService from '../../services/auth';
import { auth as errors, global } from '../../utils/constants/error';
import { auth as models } from '../../utils/constants/model';

const store = useAuthStore();
const router = useRouter();
const data = reactive({
  name: '',
  password: '',
});
const isDisabled = ref(true);
const serverError = ref([]);

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(global.REQUIRED, required),
    email: helpers.withMessage(errors.EMAIL, email),
  },
  password: {
    required: helpers.withMessage(global.REQUIRED, required),
    minLength: helpers.withMessage(errors.PASSWORD(models.PASSWORD_MIN_LEN, models.PASSWORD_MAX_LEN), minLength(models.PASSWORD_MIN_LEN)),
    maxLength: helpers.withMessage(errors.PASSWORD(models.PASSWORD_MIN_LEN, models.PASSWORD_MAX_LEN), maxLength(models.PASSWORD_MAX_LEN)),
  },
}));

const v$ = useVuelidate(rules, data);

watch(data, () => {
  isDisabled.value = v$.value.email.$invalid || v$.value.password.$invalid;
}, { deep: true });

watch(serverError, () => {
  isDisabled.value = serverError.value.length;
});

async function onSubmitHandler() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  authService.login(data.email, data.password)
    .then((res) => {
      if (!res.accessToken) {
        serverError.value = res.message;
        return;
      }
      store.userLogin(res);
      onCancelFormHandler();
    })
    .catch(err => console.error(err));
};

function onCancelFormHandler() {
  router.push({ path: '/' });
};
</script>

<!-- todo link to register -->
<template>
  <section class="form-section">
    <AppTitle
      title="login"
      image="/images/baby-bump-bonding-3.webp"
      text="login-image"
      class-name="form-title"
    />
    <p class="form-content">
      Please complete the login. You don't have an account? Go to
      <router-link class="navigation-link" to="/register">
        Register
      </router-link>
    </p>
    <ServerError v-if="serverError.length" :errors="serverError" />
    <form class="form" @submit.prevent="onSubmitHandler">
      <AppInput
        v-model.trim="v$.email.$model"
        :errors="v$?.email.$errors"
        name="email"
        label="Email"
      />
      <AppInput
        v-model.trim="v$.password.$model"
        :errors="v$?.password.$errors"
        name="password"
        type="password"
        label="Password"
      />
      <FormButton :is-disabled="isDisabled" @on-cancel-form-handler="onCancelFormHandler" />
    </form>
  </section>
</template>
