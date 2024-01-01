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
});
</script>

<template>
  <Jumbo :image="props.image" :text="props.text" />
  <h2 class="section-title">
    {{ props.title }}
  </h2>
</template>
