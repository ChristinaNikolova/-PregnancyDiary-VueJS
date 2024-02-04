<script setup>
import AppTitle from './shared/AppTitle.vue';
</script>

<template>
  <section class="not-found">
    <AppTitle title="page not found" />
    <p class="not-found-content">
      The page you are looking for doesn't exist
    </p>
    <button type="button" class="btn btn-primary">
      <router-link to="/">
        Go back to Home
      </router-link>
    </button>
  </section>
</template>

<style scoped>
.not-found a {
  color: var(--clr-white);
}

.not-found-content {
  font-size: 18px;
  margin-bottom: 100px;
}
</style>
