<script setup>
import AppTitle from './shared/AppTitle.vue';
</script>

<template>
  <section class="not-found">
    <AppTitle title="page not found" />
    <p class="not-found-content">
      The page you are looking for doesn't exist
    </p>
    <AppButton name=" Go back to Home" link="/" />
  </section>
</template>

<style scoped>
.not-found-content {
  font-size: 18px;
  margin-bottom: 100px;
}
</style>
