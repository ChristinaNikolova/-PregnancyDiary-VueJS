<script setup>
import { reactive } from 'vue';
import AppInput from '../shared/inputs/AppInput.vue';

// todo remove data

const emit = defineEmits(['onClose', 'onSearch']);
const data = reactive({
  search: '',
});
</script>

<template>
  <section class="blog-search">
    <AppInput
      v-model.trim="data.search"
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
