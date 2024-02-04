<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <li class="last-three-articles-li">
    <div class="last-three-articles-li-img-wrapper">
      <img class="last-three-articles-li-img" :src="props.article.picture" :alt="props.article.title">
    </div>
    <h5 class="last-three-articles-li-title">
      {{ props.article.title }}
    </h5>
    <p class="last-three-articles-li-content">
      {{ props.article.shortContent }}
    </p>
    <button class="btn btn-primary">
      <router-link :to="`/blog/${props.article.id}`">
        Continue reading
      </router-link>
    </button>
  </li>
</template>

<style scoped>
.last-three-articles-li {
  width: 30%;
  background-color: var(--clr-cream-bg);
  overflow: hidden;
  padding-bottom: 80px ;
}

.last-three-articles-li-img-wrapper {
  width: 500px;
  height: 600px;
  margin: 50px auto;
}

.last-three-articles-li-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.last-three-articles-li-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.last-three-articles-li-content {
  font-size: 16px;
  text-align: justify;
  margin-bottom: 60px;
  padding-left: 30px;
  padding-right: 30px;
}

.last-three-articles-li a {
  color: var(--clr-white);
}
</style>
