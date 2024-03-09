<script setup>
import { useAuthStore } from '../store/auth';
import { queries } from '../utils/constants/global';

const store = useAuthStore();
</script>

<template>
  <footer class="footer">
    <div class="footer-nav-wrapper">
      <nav class="footer-left-nav">
        <ul class="footer-nav-ul">
          <li class="footer-nav-li">
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li class="footer-nav-li">
            <router-link to="/diary/create">
              Create new diary
            </router-link>
          </li>
          <li v-if="store.user.isAuthenticated" class="footer-nav-li">
            <router-link to="/diary">
              My diaries
            </router-link>
          </li>
          <li class="footer-nav-li" />
        </ul>
      </nav>
      <nav class="footer-right-nav">
        <ul class="footer-nav-ul">
          <li class="footer-nav-li">
            <router-link :to="queries.BLOG_DEFAULT">
              Blog
            </router-link>
          </li>
          <li v-if="store.user.isAuthenticated" class="footer-nav-li">
            <router-link to="/user/favourite-articles">
              Favourites Articles
            </router-link>
          </li>
          <li v-if="store.user.isAuthenticated" class="footer-nav-li">
            <router-link to="/logout">
              Logout
            </router-link>
          </li>
          <li v-if="!store.user.isAuthenticated" class="footer-nav-li">
            <router-link to="/login">
              Login
            </router-link>
          </li>
          <li v-if="!store.user.isAuthenticated" class="footer-nav-li">
            <router-link to="/register">
              Register
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <p class="footer-text">
      &copy;{{ new Date().getFullYear() }},
      <a href="https://github.com/ChristinaNikolova/PregnancyDiary-VueJS" rel="noreferrer" target="_blank">Pregnancy Diary by Christina Nikolova</a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  height: 22vh;
  font-size: 18px;
  padding: 60px 60px;
}

.footer-nav-wrapper {
  display: flex;
  gap: 400px;
  margin-bottom: 60px;
}

.footer-nav-ul {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-nav-li:hover {
  cursor: pointer;
  text-decoration: underline;
}

.footer-text {
  text-align: center;
  font-size: 18px;
}

.footer-text a {
  color: var(--clr-black);
}

.footer-text a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 850px) {
  .footer-nav-wrapper {
   display: unset;
   text-align: center;
  }

  .footer-text {
    margin-top: 20px;
  }
}

@media screen and (max-width: 500px) {
  .footer-text {
    font-size: 16px;
  }
}

@media screen and (max-width: 400px) {
  .footer-nav-li {
    font-size: 16px;
  }
}
</style>
