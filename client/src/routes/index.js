import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Blog from '../components/blog/All.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import AllCategories from '../components/administration/category/All.vue';
import CreateCategory from '../components/administration/category/Create.vue';
import UpdateCategory from '../components/administration/category/Update.vue';
import AllArticles from '../components/administration/article/All.vue';
import CreateArticle from '../components/administration/article/Create.vue';
import UpdateArticle from '../components/administration/article/Update.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/administration/category', component: AllCategories },
  { path: '/administration/category/create', component: CreateCategory },
  { path: '/administration/category/update/:id', component: UpdateCategory },
  { path: '/administration/article', component: AllArticles },
  { path: '/administration/article/create', component: CreateArticle },
  { path: '/administration/article/update/:id', component: UpdateArticle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
