<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../../store/auth';
import articlesService from '../../../services/articles';
import likes from '../../../utils/helpers/likes';
import { queries } from '../../../utils/constants/global';
import AppTitle from '../../shared/AppTitle.vue';
import Comments from '../comment/All.vue';
import forms from '../../../utils/helpers/forms';

const store = useAuthStore();
const route = useRoute();
const id = route.params.id;
const article = ref({});
const likeCount = ref(0);
const isLiked = ref(false);
const name = ref('');

onMounted(() => {
  articlesService
    .getById(id)
    .then((res) => {
      article.value = res;
      likeCount.value = res.likes.length;
      isLiked.value = getLikes(res.likes);
      name.value = `Back to ${article.value.category}`;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
});

function onLike() {
  articlesService
    .like(id)
    .then((res) => {
      likeCount.value = res.likes.length;
      isLiked.value = getLikes(res.likes);
    })
    .catch(err => console.error(err));
}

function getLikes(result) {
  return likes.setIsLikedHelper(result, store.user.userId);
}
</script>

<template>
  <section class="article">
    <template v-if="article">
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
          {{ likeCount }} likes
        </p>
        <p
          v-for="(a, i) in article.content"
          :key="i"
          class="article-content-singe"
        >
          {{ a }}
        </p>
      </article>
      <div class="article-buttons-wrapper">
        <AppButton name="Back to blog" :link="queries.BLOG_DEFAULT" :is-primary="false" />
        <AppButton :name="name" :link="`/blog/by-category/${article.category}/${article.categoryId}`" :is-primary="false" />
        <button
          v-if="isLiked"
          type="button"
          class="btn btn-primary"
          @click="onLike"
        >
          Remove from favourites
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary"
          @click="onLike"
        >
          Add to favourites
        </button>
      </div>
      <Comments :article-id="id" />
    </template>
    <Loading v-else />
  </section>
</template>

<style scoped>
.article:deep(h2) {
  text-align: left;
  margin-left: 200px;
  margin-bottom: 4px;
}

.article-content {
  font-size: 18px;
  text-align: justify;
  margin: 0 200px 40px 200px;
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
  letter-spacing: .7px;
  margin-bottom: 28px;
}

.article-buttons-wrapper {
  margin-bottom: 100px;
}

.article-buttons-wrapper .btn:first-of-type,
.article-buttons-wrapper .btn:nth-child(2) {
  margin-right: 20px;
}
</style>
