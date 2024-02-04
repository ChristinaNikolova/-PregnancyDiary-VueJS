<script setup>
import { onMounted, ref } from 'vue';
import homeService from '../services/home';

const lastThreeArticles = ref([]);

onMounted(() => {
  homeService
    .getLastThreeArticles()
    .then((res) => {
      console.log(res);
      lastThreeArticles.value = res;
    })
    .catch(err => console.error(err));
});
</script>

<template>
  <section class="home">
    <Jumbo image="/images/smiling-baby.jpg" text="smiling-baby" />
    <section class="home-content-wrapper">
      <h2 class="section-title home-content-title">
        Memory Books. Made Online.
      </h2>
      <p class="home-content-text">
        A Baby Fills a Place in Your Heart That You Never Knew Was Empty!
      </p>
      <button type="button" class="btn btn-primary">
        <router-link to="/diary/create">
          Create new diary
        </router-link>
      </button>
    </section>
    <section class="home-user">
      <div class="home-user-wrapper">
        <h2 class="white-section-title home-user-title">
          Capture moments before they become blurry.
        </h2>
        <p class="home-user-content">
          Beautiful moments won't be ingrained in your memory forever.
          Ensure you document the wonderful moments before it's too late.
        </p>
        <div class="home-user-btns-wrapper">
          <button type="button" class="btn btn-secondary">
            <router-link to="/diary">
              My Diaries
            </router-link>
          </button>
        </div>
      </div>
    </section>
    <section class="home-blog">
      <div class="home-blog-img-wrapper">
        <img class="home-blog-img" src="/images/LoveAndWildJuly2020-61.jpg" alt="pregnancy-diary-blog">
      </div>
      <h2 class="section-title home-blog-title">
        Check our blog
      </h2>
      <button type="button" class="btn btn-primary">
        <router-link to="/blog?page=1&query=no%20search">
          Go to blog
        </router-link>
      </button>
    </section>
    <section class="home-articles">
      <h2 class="home-articles-title">
        Recent Articles
      </h2>
      <ul class="home-articles-ul">
        <li v-for="a in lastThreeArticles" :key="a.id" class="home-articles-li">
          {{ a.shortContent }}
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.home-content-wrapper {
  margin-bottom: 80px;
}

.home-content-text {
  letter-spacing: 1.4px;
  margin-bottom: 40px;
}
.home-user {
  position: relative;
  background-image: url('/images/pregnant-woman.jpeg');
  background-repeat:no-repeat;
  background-position: center center;
  background-size: cover;
  height: 42vh;
  width: 100%;
}

.home-user-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 360px;
  width: 760px;
  background-color: var(--clr-brown);
  padding: 30px 50px;
}

.home-user-content {
  color: var(--clr-white);
  letter-spacing: 1.2px;
  line-height: 1.8;
  margin-bottom: 26px;
}

.home-user-btns-wrapper a {
  color: var(--clr-brown);
}

.home .btn.btn-primary a {
  color: var(--clr-white);
}

.home-blog {
  padding-top: 130px;
  padding-bottom: 130px;
}

.home-blog-img-wrapper {
  max-width: 700px;
  max-height: 500px;
  margin: 0 auto;
  margin-bottom: 50px;
}

.home-blog-img {
  width: 100%;
  object-fit: cover;
}

.home-blog-title {
  margin-bottom: 40px;
}

.home-articles {
  background-color: var(--clr-cream-bl);
  padding: 30px 10px;
}

.home-articles-ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.home-articles-li {
  width: 30%;
  background-color: var(--clr-cream-bg);
}
</style>
