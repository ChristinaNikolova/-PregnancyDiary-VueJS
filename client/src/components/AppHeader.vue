<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAuthStore } from '../store/auth';

const store = useAuthStore();
const showMenu = ref(false);

onMounted(() => {
  window.addEventListener('click', toogleMenu);
});

onUnmounted(() => {
  window.removeEventListener('click', toogleMenu);
});

function toogleMenu(e) {
  if (e.target.classList.contains('header-admin')) {
    showMenu.value = !showMenu.value;
  }
  else {
    showMenu.value = false;
  }
}
</script>

<template>
  <header class="header">
    <div class="header-logo-wrapper">
      <p class="header-logo">
        Pregnancy Diary
      </p>
    </div>
    <nav class="header-nav">
      <ul class="header-nav-ul">
        <li class="header-nav-li">
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li class="header-nav-li">
          Create new diary
        </li>
        <li v-if="store.user.isAuthenticated" class="header-nav-li">
          Diaries
        </li>
        <li class="header-nav-li">
          <router-link to="/blog?page=1&query=">
            Blog
          </router-link>
        </li>
        <li v-if="store.user.isAuthenticated" class="header-nav-li">
          Favourites
        </li>
        <li class="header-nav-li header-admin">
          Administration
          <i v-if="!showMenu" class="fa-solid fa-arrow-down" />
          <i v-else class="fa-solid fa-arrow-up" />
          <ul v-show="showMenu" class="header-nav-li-ul">
            <li class="header-nav-li-li">
              <router-link to="/administration/category">
                All Categories
              </router-link>
            </li>
            <li class="header-nav-li-li">
              <router-link to="/administration/category/create">
                Create Category
              </router-link>
            </li>
            <li class="header-nav-li-li">
              <router-link to="/administration/article">
                All Articles
              </router-link>
            </li>
            <li class="header-nav-li-li">
              <router-link to="/administration/article/create">
                Create Article
              </router-link>
            </li>
          </ul>
        </li>
        <li v-if="store.user.isAuthenticated" class="header-nav-li">
          <router-link to="/logout">
            Logout
          </router-link>
        </li>
        <li v-if="!store.user.isAuthenticated" class="header-nav-li">
          <router-link to="/login">
            Login
          </router-link>
        </li>
        <li v-if="!store.user.isAuthenticated" class="header-nav-li">
          <router-link to="/register">
            Register
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding-top: 50px;
  padding-bottom: 30px;
}

.header-logo {
  color: var(--clr-brown);
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -.5px;
}

.header-nav-ul {
  display: flex;
  gap: 40px;
  font-size: 18px;
}

.header-nav-li {
 position: relative;
}

.header-nav-li a.router-link-active {
  text-decoration: underline;
}

.header-nav-li i {
  margin-left: 4px;
  font-size: 12px;
}
.header-nav-li:hover {
  cursor: pointer;
  text-decoration: underline;
}

.header-nav-li-ul {
  position: absolute;
  z-index: 1000;
  top: 57px;
  width: 180%;
  padding: 20px;
  border-top: 1px solid var(--clr-grey);
  background-color: var(--clr-cream-bg);
}

.header-nav-li-li {
  margin-bottom: 14px;
}

.header-nav-li-li:hover{
  text-decoration: underline;
}
</style>
