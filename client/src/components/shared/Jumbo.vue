<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
    default: '/images/smiling-baby.jpg',
  },
  text: {
    type: String,
    required: true,
    default: 'smiling-baby',
  },
});
</script>

<template>
  <section class="jumbo">
    <img :src="props.image" :alt="props.text">
  </section>
</template>

<style scoped>
.jumbo {
  width: 100%;
  margin-bottom: 80px;
}

.jumbo img {
  width: 100%;
  height: 42vh;
  object-fit: cover;
}
</style>
