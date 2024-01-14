<script setup>
import { onMounted, ref } from 'vue';
import articlesService from '../../../services/articles';
import AppTable from '../../shared/table/AppTable.vue';
import AppList from '../../shared/table/AppList.vue';

const title = 'Total articles';
const articles = ref([]);

onMounted(() => {
  loadArticles();
});

function onDeleteHandler(e, id) {
  articlesService
    .deleteById(id)
    .then(() => loadArticles())
    .catch(err => console.error(err));
}

function loadArticles() {
  articlesService
    .allAdmin()
    .then(res => articles.value = res)
    .catch(err => console.error(err));
}
</script>

<template>
  <AppList element="articles" :is-element="!!articles.length">
    <template #title>
      <AppTitle
        :title="`${title} : ${articles.length}`"
        image="/images/martha-brook-blog-post-brilliant-gifts-for-pregnant-women-pregnant-woman-sitting-on-bed-banner-1500x550.webp"
        text="administration-image"
      />
    </template>
    <template #table>
      <AppTable
        :collection="articles"
        update-link="/administration/article/update"
        show-details
        @on-delete-handler="onDeleteHandler"
      />
    </template>
  </AppList>
</template>
