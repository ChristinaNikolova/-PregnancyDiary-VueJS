<script setup>
import { onMounted, ref } from 'vue';
import commentsService from '../../../services/comments';
import Form from './Form.vue';

const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
});

const comments = ref([]);

onMounted(() => {
  commentsService
    .all(props.articleId)
    .then(res => (comments.value = res))
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="comments">
    <h2 class="section-title">
      Comments
    </h2>
    <Form :article-id="articleId" />
    <ul v-if="comments">
      <li v-for="c in comments" :key="c.id">
        {{ c.content }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.comments {
  width: 80%;
  margin: 0 auto;
}

.comments .section-title {
  margin: unset;
  text-align: center;
  margin-bottom: 50px;
}
</style>
