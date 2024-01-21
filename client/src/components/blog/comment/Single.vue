<script setup>
const props = defineProps({
  comment: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <li class="comment-single">
    <div class="comment-single-header-wrapper">
      <p class="comment-single-created">
        {{ props.comment.createdAt }}
      </p>
      <p class="comment-single-likes">
        {{ props.comment.likesCount }} likes
      </p>
      <p class="comment-single-creator-name">
        {{ props.comment.creatorName }}
      </p>
    </div>
    <p class="comment-single-content">
      {{ props.comment.content }}
    </p>
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
}
</style>
