<script setup>
const props = defineProps({
  element: {
    type: String,
  },
  isElement: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section class="all">
    <slot name="title" />
    <slot v-if="props.isElement" name="table" />
    <Empty v-else :element="props.element" />
  </section>
</template>

<style scoped>
.all {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
}

.all::after {
  position: absolute;
  content: '';
  width: 100%;
  left: 0%;
  bottom: -34px;
  border-bottom: 1.5px solid var(--clr-grey);
}
</style>
