<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import articlesService from '../../services/articles';
import { directions } from '../../utils/constants/global';
import forms from '../../utils/helpers/forms';
import Pagination from '../shared/Pagination.vue';
import Single from './Single.vue';
import Search from './Search.vue';

const router = useRouter();
const route = useRoute();
const articles = ref([]);
const currentPage = ref(1);
const pagesCount = ref(1);
const showSearchForm = ref(false);

onMounted(() => {
  loadArticles();
});

watch(currentPage, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadArticles();
    getNewQuery();
  }
});

watch(route, (newValue) => {
  if (newValue.fullPath === '/blog?page=1') {
    currentPage.value = 1;
    getNewQuery();
    loadArticles();
  }
});

function onPaginationHandler(direction, step) {
  if (direction) {
    const value = direction === directions.PREV ? -1 : 1;
    currentPage.value = currentPage.value + value;
  }
  else {
    currentPage.value = step;
  }
};

function getNewQuery() {
  router.push(`/blog?page=${currentPage.value}`);
};

function loadArticles() {
  articlesService
    .all(currentPage.value)
    .then((res) => {
      currentPage.value = Number(res.currentPage);
      pagesCount.value = Number(res.pagesCount);
      articles.value = res.articles;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
}

function toogleSearchForm() {
  showSearchForm.value = !showSearchForm.value;
}
</script>

<template>
  <section class="blog">
    <Jumbo
      image="/images/Mother-kissing-her-sleeping-newborn-baby-1215321361_2125x1416-1024x683.jpeg"
      text="mommy-and-baby"
    />
    <div v-if="articles.length" class="blog-wrapper">
      <div class="blog-title-wrapper">
        <template v-if="!showSearchForm">
          <h2 v-if="!showSearchForm" class="section-title">
            Birth and Baby Blog
          </h2>
          <i class="fa-solid fa-magnifying-glass" @click="toogleSearchForm" />
        </template>
        <h2 v-else class="section-title">
          Searched results
        </h2>
      </div>
      <template v-if="showSearchForm">
        <Search @on-close="toogleSearchForm" />
      </template>
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

.blog-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.blog-title-wrapper h2 {
  margin-bottom: unset;
}

.blog-title-wrapper i {
  font-size: 16px;
}

.blog-title-wrapper i:hover {
  cursor: pointer;
  color: var(--clr-brown);
  font-weight: 700;
}

.blog-ul {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  overflow: hidden;
  margin-top: 60px;
}
</style>
