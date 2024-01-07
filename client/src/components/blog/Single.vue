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
      <p class="article-content-likes">
        {{ article.likesCount }} likes
      </p>
      <p v-for="(a, i) in article.content" :key="i" class="article-content-singe">
        {{ a }}
      </p>
    </article>
    <div class="article-buttons-wrapper">
      <button class="btn btn-secondary">
        <router-link to="/blog">
          Back to blog
        </router-link>
      </button>
      <button class="btn btn-primary">
        <router-link to="/blog">
          Add to Favourites
        </router-link>
      </button>
    </div>
  </section>
</template>

<style scoped>
.article:deep(h2) {
   text-align: left;
   margin-left: 100px;
   margin-bottom: 4px;
}

.article-content {
   text-align: justify;
   margin: 0 100px 40px 100px;
}

.article-content-created,
.article-content-category,
.article-content-likes {
   font-size: 12px;
   text-transform: uppercase;
   letter-spacing: 1px;
   margin-bottom: 5px;
}
.article-content-likes {
   margin-bottom: 20px;
}

.article-content-singe {
   letter-spacing: 1px;
   margin-bottom: 28px;
}

.article-buttons-wrapper .btn:first-of-type {
    margin-right: 20px;
}

.article-buttons-wrapper .btn.btn-primary a {
    color: var(--clr-white);
}
</style>
