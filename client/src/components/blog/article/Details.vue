<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../../store/auth";
import articlesService from "../../../services/articles";
import likes from "../../../utils/helpers/likes";
import { queries } from "../../../utils/constants/global";
import AppTitle from "../../shared/AppTitle.vue";
import Comments from "../comment/All.vue";

const store = useAuthStore();
const route = useRoute();
const id = route.params.id;
const article = ref({});
const likeCount = ref(0);
const isLiked = ref(false);

onMounted(() => {
  articlesService
    .getById(id)
    .then((res) => {
      article.value = res;
      likeCount.value = res.likes.length;
      isLiked.value = getLikes(res.likes);
    })
    .catch((err) => console.error(err));
});

function like() {
  articlesService
    .like(id)
    .then((res) => {
      likeCount.value = res.likes.length;
      isLiked.value = getLikes(res.likes);
    })
    .catch((err) => console.error(err));
}

function getLikes(result) {
  return likes.setIsLikedHelper(result, store.user.userId);
}
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
      <p class="article-content-likes">{{ likeCount }} likes</p>
      <p
        v-for="(a, i) in article.content"
        :key="i"
        class="article-content-singe"
      >
        {{ a }}
      </p>
    </article>
    <div class="article-buttons-wrapper">
      <button class="btn btn-secondary">
        <router-link :to="queries.BLOG_DEFAULT"> Back to blog </router-link>
      </button>
      <button class="btn btn-secondary">
        <router-link
          :to="`/blog/by-category/${article.category}/${article.categoryId}`"
        >
          Back to {{ article.category }}
        </router-link>
      </button>
      <button v-if="isLiked" class="btn btn-primary" @click="like">
        Remove from favourites
      </button>
      <button v-else class="btn btn-primary" @click="like">
        Add to favourites
      </button>
    </div>
    <Comments :article-id="id" />
  </section>
</template>

<style scoped>
.article:deep(h2) {
  text-align: left;
  margin-left: 200px;
  margin-bottom: 4px;
}

.article-content {
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
  letter-spacing: 1px;
  margin-bottom: 28px;
}

.article-buttons-wrapper {
  margin-bottom: 100px;
}

.article-buttons-wrapper .btn:first-of-type,
.article-buttons-wrapper .btn:nth-child(2) {
  margin-right: 20px;
}

.article-buttons-wrapper .btn.btn-primary a {
  color: var(--clr-white);
}
</style>
