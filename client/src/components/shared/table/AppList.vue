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
    <Jumbo image="/images/martha-brook-blog-post-brilliant-gifts-for-pregnant-women-pregnant-woman-sitting-on-bed-banner-1500x550.webp" text="administration-image" />
    <h2 class="section-title">
      All {{ props.element }}
    </h2>
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
