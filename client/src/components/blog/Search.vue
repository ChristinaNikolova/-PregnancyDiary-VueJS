<script setup>
import AppInput from '../shared/inputs/AppInput.vue';

const emit = defineEmits(['onClose']);
</script>

<template>
  <section class="blog-search">
    <AppInput />
    <i class="fa-regular fa-circle-xmark" @click="$emit('onClose')" />
  </section>
</template>

<style scoped>
.blog-search {
  width: 100%;
  display: block;
  position: relative;
}

.blog-search i {
  position: absolute;
  right: 12%;
  top: 50%;
  transform: translateY(-50%);
}

.blog-search i:hover {
  cursor: pointer;
  color: var(--clr-brown);
  font-weight: 700;
}
</style>
