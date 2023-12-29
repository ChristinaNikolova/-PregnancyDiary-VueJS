<script setup>
const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="server-errors-wrapper">
    <div v-for="(e, i) in props.errors" :key="i" class="server-error">
      {{ e.msg }}
    </div>
  </div>
</template>

<style scoped>
.server-errors-wrapper {
  width: 80%;
  margin: 0 auto 40px auto;
  padding: 10px;
  text-align: center;
  text-transform: none;
  color: var(--clr-brown);
  background-color: var( --clr-cream-bl);
  font-weight: 500;
}
</style>
