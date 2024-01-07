<script setup>
import { onMounted, ref } from 'vue';
import articlesService from '../../services/articles';

const articles = ref([]);

onMounted(() => {
  articlesService
    .all()
    .then(res => (articles.value = res.articles))
    .catch(err => console.error(err));
});
</script>

<!--  todo extract li -->
<template>
  <section class="blog">
    <Jumbo
      image="/images/Mother-kissing-her-sleeping-newborn-baby-1215321361_2125x1416-1024x683.jpeg"
      text="mommy-and-baby"
    />
    <div v-if="articles.length" class="blog-wrapper">
      <h2 class="section-title">
        Birth and Baby Blog
      </h2>
      <ul class="blog-ul">
        <li v-for="a in articles" :key="a.id" class="blog-li">
          <router-link :to="`blog/${a.id}`">
            <img class="blog-li-picture" :src="a.picture">
            <div class="blog-li-content-wrapper">
              <h4 class="blog-li-title">
                {{ a.title }}
              </h4>
              <span class="blog-li-content">{{ a.shortContent }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <template v-else>
      <Empty element="articles" />
      <Jumbo
        image="/images/web3-woman-pregnant-light-spiritual-shutterstock_1466000780.webp"
        text="pregnant-woman"
      />
    </template>
  </section>
</template>

<style scoped>
.blog-wrapper {
  margin: 0 auto;
  width: 90%;
}

.blog-ul {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  overflow: hidden;
}

.blog-li {
  background-color: var(--clr-cream-bl);
  padding: 0px 0px 40px 0px;
}

.blog-li-picture {
  width: 100%;
  object-fit: cover;
}

.blog-li:nth-child(3n+1) {
  width: 100%;
}

.blog-li:nth-child(3n+1) .blog-li-picture {
  height: 700px;
}

.blog-li:nth-child(3n+2),
.blog-li:nth-child(3n+3) {
  width: 49%;
}

.blog-li:nth-child(3n+2) .blog-li-picture,
.blog-li:nth-child(3n+3) .blog-li-picture {
  height: 70%;
}

.blog-li-content-wrapper {
  padding-left: 20px;
  padding-right: 20px;
}

.blog-li-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  padding-top: 30px;
}

.blog-li-content {
  line-height: 2;
}

.blog-li:hover {
  cursor: pointer;
}

.blog-li:hover .blog-li-picture {
  transform: scale(1.04);
  transition: all .6s;
}

.blog-li:hover .blog-li-title {
  text-decoration: underline;
}
</style>
