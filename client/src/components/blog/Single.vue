<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import articlesService from '../../services/articles';
import AppTitle from '../shared/AppTitle.vue';

const route = useRoute();
const id = route.params.id;
const article = ref({});

onMounted(() => {
  articlesService
    .getById(id)
    .then(res => article.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="article">
    <AppTitle
      :title="article.title"
      :image="article.picture"
      :text="article.title"
    />
    <article class="article-content">
      <p class="article-content-created">
        {{ article.createdAt }}
      </p>
      <p class="article-content-category">
        {{ article.category }}
      </p>
      {{ article.content }}
    </article>
  </section>
</template>

<style scoped>
.article-content-created {
    margin-bottom: 20px;
}
</style>
