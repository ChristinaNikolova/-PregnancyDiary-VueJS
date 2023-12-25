<script setup>
import { onMounted, ref } from 'vue';
import articlesService from '../../services/articles';
import Jumbo from '../shared/Jumbo.vue';

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
    <div v-else class="blog-wrapper-empty">
      <h2 class="blog-title">
        No articles yet
      </h2>
    </div>
    <Jumbo
      image="/images/web3-woman-pregnant-light-spiritual-shutterstock_1466000780.webp"
      text="pregnant-woman"
    />
  </section>
</template>

<style scoped>
.blog-wrapper-empty {
  margin-bottom: 180px;
}
.blog-title {
  position: relative;
  font-size: 60px;
  font-weight: 500;
  text-align: center;
}

.blog-title::after {
  position: absolute;
  content: '';
  width: 150px;
  left: 46%;
  top: 98px;
  border-bottom: 1.2px solid  var(--clr-brown);
}
</style>
