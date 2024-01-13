<script setup>
import { onMounted, ref } from 'vue';
import articlesService from '../../services/articles';
import { directions } from '../../utils/constants/global';
import Pagination from '../shared/Pagination.vue';
import Single from './Single.vue';

const articles = ref([]);
const currentPage = ref(1);
const pagesCount = ref(1);

onMounted(() => {
  articlesService
    .all()
    .then((res) => {
      currentPage.value = Number(res.currentPage);
      pagesCount.value = Number(res.pagesCount);
      articles.value = res.articles;
    })
    .catch(err => console.error(err));
});

function onPaginationHandler(direction, step) {
  if (direction) {
    const value = direction === directions.PREV ? -1 : 1;
    currentPage.value = currentPage.value + value;
  }
  else {
    currentPage.value = step;
  }

  console.log('all', currentPage.value);
  // form.scrollToTop();
};
</script>

<template>
  <section class="blog">
    <Jumbo
      image="/images/Mother-kissing-her-sleeping-newborn-baby-1215321361_2125x1416-1024x683.jpeg"
      text="mommy-and-baby"
    />
    <div v-if="articles.length" class="blog-wrapper">
      <h2 class="section-title">
        Birth and Baby Blog
      </h2>
      <ul class="blog-ul">
        <template v-for="a in articles" :key="a.id">
          <Single :article="a" />
        </template>
      </ul>
    </div>
    <template v-else>
      <Empty element="articles" />
      <Jumbo
        image="/images/web3-woman-pregnant-light-spiritual-shutterstock_1466000780.webp"
        text="pregnant-woman"
      />
    </template>
    <Pagination
      :current-page="currentPage"
      :pages-count="pagesCount"
      url="/blog"
      @on-click-handler="onPaginationHandler"
    />
  </section>
</template>

<style scoped>
.blog-wrapper {
  margin: 0 auto;
  width: 90%;
}

.blog-ul {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  overflow: hidden;
}
</style>
