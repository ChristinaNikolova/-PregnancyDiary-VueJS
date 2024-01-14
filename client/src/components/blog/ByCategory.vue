<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import articlesService from '../../services/articles';

// todo add title. all categories, back to blog
const route = useRoute();
const categoryId = route.params.id;
const articles = ref([]);

onMounted(() => {
  articlesService
    .getByCategory(categoryId)
    .then(res => articles.value = res)
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="by-category">
    <ul class="by-category-ul">
      <li v-for="a in articles" :key="a.id" class="by-category-li">
        <router-link :to="`/blog/${a.id}`">
          <div class="by-category-li-img-wrapper">
            <img class="by-category-li-img" :src="a.picture" :alt="a.title">
          </div>
          <h4 class="by-category-li-title">
            {{ a.title }}
          </h4>
          <p class="by-category-li-created">
            {{ a.createdAt }}
          </p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.by-category-ul {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   gap: 20px;
}

.by-category-li {
   width: 30%;
   height: 430px;
   text-align: left;
   background-color: var(--clr-cream-bl);
}

.by-category-li-img-wrapper {
   width:100%;
   height: 300px;
   overflow: hidden;
}

.by-category-li-img {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.by-category-li-img:hover {
  transform: scale(1.04);
  transition: all .6s;
}

.by-category-li-title {
   font-size: 18px;
   font-weight: 400;
   padding: 20px 30px 10px 30px;
   text-wrap: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
}

.by-category-li-created {
   padding-left: 30px;
}
</style>
