<script setup>
import { onMounted, ref } from "vue";
import articlesService from "../../services/articles";
import Jumbo from "../shared/Jumbo.vue";

const articles = ref([]);

onMounted(() => {
  articlesService
    .all()
    .then((res) => (articles.value = res))
    .catch((err) => console.error(err));
});
</script>

<template>
  <section class="blog">
    <Jumbo
      image="/images/Mother-kissing-her-sleeping-newborn-baby-1215321361_2125x1416-1024x683.jpeg"
      text="mommy-and-baby"
    />
  </section>
</template>

<style scoped></style>
