<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <li class="article-li">
    <router-link :to="`/blog/${props.article.id}`">
      <div class="article-li-img-wrapper">
        <img class="article-li-img" :src="props.article.picture" :alt="props.article.title">
      </div>
      <h4 class="article-li-title">
        {{ props.article.title }}
      </h4>
      <p class="article-li-created">
        {{ props.article.createdAt }}
      </p>
    </router-link>
  </li>
</template>

<style scoped>
.article-li {
  width: 30%;
  height: 430px;
  text-align: left;
  background-color: var(--clr-cream-bl);
}

.article-li-img-wrapper {
  width:100%;
  height: 300px;
  overflow: hidden;
}

.article-li-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-li-img:hover {
  transform: scale(1.04);
  transition: all .6s;
}

.article-li-title {
  font-size: 18px;
  font-weight: 400;
  padding: 20px 30px 10px 30px;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.article-li-created {
  padding-left: 30px;
}

@media screen and (max-width: 850px) {
  .article-li {
    width: 90%;
  }
}
</style>
