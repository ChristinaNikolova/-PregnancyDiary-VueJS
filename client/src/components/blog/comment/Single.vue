<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../../../store/auth';
import likes from '../../../utils/helpers/likes';
import commentsService from '../../../services/comments';

const props = defineProps({
  comment: {
    type: Object,
    default: () => {},
  },
  articleId: {
    type: String,
    required: true,
  },
});
const store = useAuthStore();
const likeCount = ref(0);
const isLiked = ref(false);

onMounted(() => {
  likeCount.value = props.comment.likesCount;
  isLiked.value = getLikes(props.comment.likes);
});

function onLike() {
  commentsService
    .like(props.comment.id, props.articleId)
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
  <li class="comment-single">
    <div class="comment-single-header-wrapper">
      <p class="comment-single-created">
        {{ props.comment.createdAt }}
      </p>
      <p class="comment-single-likes">
        {{ likeCount }} likes
      </p>
      <p class="comment-single-creator-name">
        {{ props.comment.creatorName }}
      </p>
    </div>
    <p class="comment-single-content">
      {{ props.comment.content }}
    </p>
    <div class="comment-single-footer-wrapper">
      <p v-if="store.user.userId === props.comment.creatorId" class="comment-single-delete">
        <i class="fa-solid fa-trash" />
      </p>
      <p v-else class="comment-single-like">
        <i v-if="isLiked" class="fa-solid fa-thumbs-up" @click="onLike" />
        <i v-else class="fa-regular fa-thumbs-up" @click="onLike" />
      </p>
    </div>
  </li>
</template>

<style scoped>
.comment-single {
  margin-bottom: 80px;
  width: 70%;
  background-color: var(--clr-cream-bl);
  padding: 20px;
}

.comment-single-header-wrapper {
  margin-bottom: 16px;
  text-align: start;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.comment-single-content {
  line-height: 2;
  text-align: justify;
  margin-bottom: 20px;
}

.comment-single-footer-wrapper {
    font-size: 14px;
    text-align: start;
    color: var(--clr-brown);
}
</style>
