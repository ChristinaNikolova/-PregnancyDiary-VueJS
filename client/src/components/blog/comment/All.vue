<script setup>
import { onMounted, ref } from 'vue';
import commentsService from '../../../services/comments';
import Form from './Form.vue';
import Single from './Single.vue';

const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
});
const comments = ref([]);

onMounted(() => {
  loadComments();
});

function loadComments() {
  commentsService
    .all(props.articleId)
    .then(res => (comments.value = res))
    .catch(err => console.error(err));
}
</script>

<template>
  <section class="comments">
    <h2 class="section-title">
      Comments
    </h2>
    <Form :article-id="articleId" @finish="loadComments" />
    <ul v-if="comments.length" class="comments-ul">
      <Single
        v-for="c in comments"
        :key="c.id"
        :comment="c"
        :article-id="props.articleId"
        @finish="loadComments"
      />
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

.comments-ul {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 850px) {
  .comments:deep(button){
    width: 100%;
  }
}

@media screen and (max-width: 650px) {
  .comments {
    width: 100%;
  }
}
</style>
