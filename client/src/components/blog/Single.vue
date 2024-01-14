<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <li class="blog-li">
    <router-link :to="`blog/${props.article.id}`">
      <img class="blog-li-picture" :src="props.article.picture">
      <div class="blog-li-content-wrapper">
        <h4 class="blog-li-title">
          {{ props.article.title }}
        </h4>
        <span class="blog-li-content">{{ props.article.shortContent }}</span>
      </div>
    </router-link>
  </li>
</template>

<style scoped>
.blog-li {
  background-color: var(--clr-cream-bl);
  padding: 0px 0px 40px 0px;
  overflow: hidden;
}

.blog-li-picture {
  width: 100%;
  object-fit: cover;
}

.blog-li:nth-child(3n+1) {
  width: 100%;
}

.blog-li:nth-child(3n+1) .blog-li-picture {
  height: 700px;
}

.blog-li:nth-child(3n+2),
.blog-li:nth-child(3n+3) {
  width: 49%;
}

.blog-li:nth-child(3n+2) .blog-li-picture,
.blog-li:nth-child(3n+3) .blog-li-picture {
  height: 70%;
}

.blog-li-content-wrapper {
  padding-left: 20px;
  padding-right: 20px;
}

.blog-li-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  padding-top: 30px;
}

.blog-li-content {
  line-height: 2;
}

.blog-li:hover {
  cursor: pointer;
}

.blog-li:hover .blog-li-picture {
  transform: scale(1.04);
  transition: all .6s;
}

.blog-li:hover .blog-li-title {
  text-decoration: underline;
}
</style>
