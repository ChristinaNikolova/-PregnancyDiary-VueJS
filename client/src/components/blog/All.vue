<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import articlesService from '../../services/articles';
import { directions, queries, search } from '../../utils/constants/global';
import forms from '../../utils/helpers/forms';
import Pagination from '../shared/Pagination.vue';
import Single from './Single.vue';
import Search from './Search.vue';
import Filter from './Filter.vue';

const router = useRouter();
const route = useRoute();
const articles = ref([]);
const currentPage = ref(1);
const pagesCount = ref(1);
const showSearchForm = ref(false);
const searchedQuery = ref(search.NO_SEARCH);
const showFilter = ref(false);

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
  if (newValue.fullPath === queries.BLOG_DEFAULT) {
    currentPage.value = 1;
    toogleSearchForm();
    getNewQuery();
    loadArticles();
  }
});

watch(searchedQuery, () => {
  currentPage.value = 1;
  loadArticles();
  getNewQuery();
});

function onSeachHandler(query) {
  if (query) {
    searchedQuery.value = query;
  }
}

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
  router.push(`/blog?page=${currentPage.value}&query=${searchedQuery.value}`);
};

function loadArticles() {
  articlesService
    .all(currentPage.value, searchedQuery.value)
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
  if (!showSearchForm.value) {
    searchedQuery.value = search.NO_SEARCH;
  }
}

function filterCategories() {
  showFilter.value = !showFilter.value;
}
</script>

<template>
  <section class="blog">
    <Jumbo
      image="/images/Mother-kissing-her-sleeping-newborn-baby-1215321361_2125x1416-1024x683.jpeg"
      text="mommy-and-baby"
    />
    <div v-if="articles.length || searchedQuery !== search.NO_SEARCH" class="blog-wrapper">
      <h2 v-if="!showSearchForm" class="section-title">
        Birth and Baby Blog
        <i v-if="!showFilter" class="fa-solid fa-magnifying-glass" @click="toogleSearchForm" />
        <i class="fa-solid fa-filter" @click="filterCategories" />
      </h2>
      <h2 v-else class="section-title">
        Searched results
      </h2>
      <template v-if="showSearchForm">
        <Search
          @on-search="onSeachHandler"
          @on-close="toogleSearchForm"
        />
      </template>
      <Filter v-if="showFilter" />
      <ul v-if="articles.length" class="blog-ul">
        <template v-for="a in articles" :key="a.id">
          <Single :article="a" />
        </template>
      </ul>
      <Empty v-else no-result />
    </div>
    <template v-else>
      <Empty element="articles" />
      <Jumbo
        image="/images/web3-woman-pregnant-light-spiritual-shutterstock_1466000780.webp"
        text="pregnant-woman"
      />
    </template>
    <Pagination
      v-if="articles.length"
      :current-page="currentPage"
      :pages-count="pagesCount"
      :query-string="`&query=${searchedQuery}`"
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

.blog-wrapper .section-title {
  position: relative;
}

.section-title i {
  position: absolute;
  font-size: 16px;
  right: 38%;
  top: 46%;
}

.section-title i.fa-filter {
  right: 36%;
}

.section-title i:hover {
  cursor: pointer;
  color: var(--clr-brown);
}

.blog-ul {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  overflow: hidden;
  margin-top: 60px;
}
</style>
