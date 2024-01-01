<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  image: {
    type: String,
  },
  text: {
    type: String,
  },
  className: {
    type: String,
    default: 'section-title',
  },
});
</script>

<template>
  <Jumbo :image="props.image" :text="props.text" />
  <h2 :class="className">
    {{ props.title }}
  </h2>
</template>
