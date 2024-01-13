<script setup>
import { directions } from '../../utils/constants/global';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pagesCount: {
    type: Number,
    default: 1,
  },
  url: {
    type: String,
    default: '',
  },
//   queryString: {
//     type: String,
//     default: '',
//   },
});
// todo add icons for the pagination
const emit = defineEmits(['onClickHandler']);
</script>

<template>
  <div class="pagination-wrapper">
    <router-link
      v-if="props.currentPage !== 1"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage - 1}`"
      @click="emit('onClickHandler', directions.PREV)"
    >
      &lt;
    </router-link>
    <template v-for="index in props.pagesCount" :key="index">
      <router-link
        class="pagination"
        :to="`${props.url}?page=${index}`"
        @click="emit('onClickHandler', '', index)"
      >
        {{ index }}
      </router-link>
    </template>
    <router-link
      v-if="props.currentPage !== props.pagesCount"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage + 1}`"
      @click="emit('onClickHandler', directions.NEXT)"
    >
      &gt;
    </router-link>
  </div>
</template>

<style scoped>
.pagination-wrapper {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 40px;
   margin-top: 60px;
   font-size: 20px;
}

.pagination {
   color: var(--clr-brown);
   font-weight: 500;
}

.pagination.selected {
   font-weight: 800;
   text-decoration: underline;
}

.pagination.test {
    color: pink;
}
</style>
