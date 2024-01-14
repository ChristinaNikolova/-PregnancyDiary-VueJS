<script setup>
import { onMounted, ref } from 'vue';
import categoriesService from '../../services/categories';

const categories = ref([]);

onMounted(() => {
  categoriesService
    .all()
    .then(res => categories.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="blog-filter">
    <h3 class="section-title">
      Filter by category
    </h3>
    <ul class="blog-filter-ul">
      <li v-for="c in categories" :key="c.id" class="blog-filter-li">
        <router-link :to="`/blog/by-category/${c.id}`">
          {{ c.name }}
        </router-link>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.blog-filter-ul {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.blog-filter-li {
  font-size: 20px;
}

.blog-filter-li a:hover {
  color: var(--clr-brown);
  font-weight: 500;
  text-decoration: underline;
}
</style>
