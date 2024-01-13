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
      <i class="fa-solid fa-chevron-left" />
    </router-link>
    <template v-for="index in props.pagesCount" :key="index">
      <router-link
        class="pagination"
        :class="[props.currentPage === index ? 'active' : '']"
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
      <i class="fa-solid fa-chevron-right" />
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
   font-weight: 400;
}

.pagination.active {
   font-weight: 600;
   text-decoration: underline;
}

.pagination i {
   font-size: 14px;
}
</style>
