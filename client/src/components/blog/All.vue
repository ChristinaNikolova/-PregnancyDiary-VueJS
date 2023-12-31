<script setup>
import { onMounted, ref } from 'vue';
import articlesService from '../../services/articles';

const articles = ref([]);

onMounted(() => {
  articlesService
    .all()
    .then(res => (articles.value = res))
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="blog">
    <Jumbo
      image="/images/Mother-kissing-her-sleeping-newborn-baby-1215321361_2125x1416-1024x683.jpeg"
      text="mommy-and-baby"
    />
    <div v-if="articles.length" class="blog-wrapper">
      <h2>A</h2>
    </div>
    <Empty v-else element="articles" />
    <Jumbo
      image="/images/web3-woman-pregnant-light-spiritual-shutterstock_1466000780.webp"
      text="pregnant-woman"
    />
  </section>
</template>
