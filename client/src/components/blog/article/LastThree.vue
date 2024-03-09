<script setup>
import { onMounted, ref } from 'vue';
import articlesService from '../../../services/articles';
import SingleLastThree from './SingleLastThree.vue';

const lastThreeArticles = ref([]);

onMounted(() => {
  articlesService
    .getLastThreeArticles()
    .then(res => lastThreeArticles.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <ul class="last-three-articles-ul">
    <SingleLastThree v-for="a in lastThreeArticles" :key="a.id" :article="a" />
  </ul>
</template>

<style scoped>
.last-three-articles-ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

@media screen and (max-width: 1000px) {
.last-three-articles-ul {
  flex-direction: column;
  }
}
</style>
