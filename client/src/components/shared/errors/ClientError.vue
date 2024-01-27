<script setup>
import { global } from '../../../utils/constants/error';

const props = defineProps({
  error: {
    type: String,
    default: global.DEFAULT,
  },
});
</script>

<template>
  <div class="client-error-wrapper">
    <div class="client-error">
      {{ props.error }}
    </div>
  </div>
</template>

<style scoped>
.client-error-wrapper {
  margin-bottom: 20px;
}

.client-error {
  position: absolute;
  left: 10%;
  text-transform: none;
  font-weight: 500;
  color: var(--clr-brown);
}
</style>
