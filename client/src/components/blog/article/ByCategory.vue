<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import articlesService from '../../../services/articles';
import forms from '../../../utils/helpers/forms';
import List from '../../shared/articles/List.vue';
import Loading from '../../shared/Loading.vue';

const route = useRoute();
const categoryId = route.params.id;
const categoryName = route.params.name;
const articles = ref([]);

onMounted(() => {
  articlesService
    .getByCategory(categoryId)
    .then((res) => {
      articles.value = res;
      forms.scrollToTop();
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="by-category">
    <Jumbo
      image="/images/pexels-photo-3890481.jpeg"
      text="working-mommy"
    />
    <h2 class="section-title">
      {{ categoryName }}
    </h2>
    <List v-if="articles.length" :articles="articles" />
    <Loading v-else />
  </section>
</template>
