<script setup>
import { onMounted } from 'vue';
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

onMounted(() => {
  console.log('pagination', props.currentPage);
});
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

    <!-- no direction -->
    <router-link
      v-if="props.currentPage - 4 > 0"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage - 4}`"
      @click="emit('onClickHandler', '', -4)"
    >
      {{ props.pagesCount - 4 }}
    </router-link>

    <a
      v-if="props.currentPage - 3 > 0"
      class="pagination"
    >
      ...
    </a>

    <!-- no direction -->
    <router-link
      v-if="props.currentPage - 2 > 0"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage - 2}`"
      @click="emit('onClickHandler', '', -2)"
    >
      {{ props.currentPage - 2 }}
    </router-link>

    <router-link
      v-if="props.currentPage - 1 > 0"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage - 1}`"
      @click="emit('onClickHandler', directions.PREV)"
    >
      {{ props.currentPage - 1 }}
    </router-link>

    <a class="pagination test">
      {{ props.currentPage }}
    </a>

    <router-link
      v-if="props.currentPage + 1 < props.pagesCount"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage + 1}`"
      @click="emit('onClickHandler', directions.NEXT)"
    >
      {{ props.currentPage + 1 }}
    </router-link>

    <!-- no direction -->
    <router-link
      v-if="props.currentPage + 2 < props.pagesCount"
      class="pagination"
      :to="`${props.url}?page=${props.currentPage + 2}`"
      @click="emit('onClickHandler', '', 2)"
    >
      {{ props.currentPage + 2 }}
    </router-link>

    <a
      v-if="props.currentPage + 3 < props.pagesCount"
      class="pagination"
    >
      ...
    </a>

    <!-- no direction -->
    <router-link
      v-if="props.currentPage + 1 <= props.pagesCount"
      class="pagination"
      :to="`${props.url}?page=${props.pagesCount}`"
      @click="emit('onClickHandler', '', props.pagesCount)"
    >
      {{ props.pagesCount }}
    </router-link>

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
