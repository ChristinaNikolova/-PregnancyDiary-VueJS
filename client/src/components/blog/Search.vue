<script setup>
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { global } from '../../utils/constants/error';
import AppInput from '../shared/inputs/AppInput.vue';

const emit = defineEmits(['onClose', 'onSearch']);
const data = reactive({
  search: '',
});

const rules = computed(() => ({
  search: {
    required: helpers.withMessage(global.REQUIRED, required),
  },
}));

const v$ = useVuelidate(rules, data);
</script>

<template>
  <section class="blog-search">
    <AppInput
      v-model.trim="v$.search.$model"
      name="search"
      label="search"
    />
    <i class="fa-regular fa-circle-xmark" @click="$emit('onClose')" />
    <i class="fa-solid fa-magnifying-glass" @click="$emit('onSearch', data.search)" />
  </section>
</template>

<style scoped>
.blog-search {
  width: 60%;
  margin: 0 auto 40px auto;
  position: relative;
}

.blog-search i {
  position: absolute;
  right: 15%;
  top: 50%;
  transform: translateY(-50%);
}

.blog-search i.fa-magnifying-glass {
  right: 12%;
}

.blog-search i:hover {
  cursor: pointer;
  color: var(--clr-brown);
  font-weight: 700;
}
</style>
