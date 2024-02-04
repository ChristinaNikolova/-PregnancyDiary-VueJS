<script setup>
import { queries } from '../../../utils/constants/global';
import Single from './Single.vue';

const props = defineProps({
  articles: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul v-if="props.articles.length" class="article-ul">
    <Single v-for="a in props.articles" :key="a.id" :article="a" />
  </ul>
  <Empty v-else element="articles" />
  <AppButton name="Back to blog" :link="queries.BLOG_DEFAULT" :is-primary="false" />
</template>

<style scoped>
.article-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>
