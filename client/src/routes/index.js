import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Blog from '../components/blog/All.vue';
import ByCategory from '../components/blog/ByCategory.vue';
import SingleArticle from '../components/blog/Details.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Logout from '../components/auth/Logout.vue';
import NotFound from '../components/NotFound.vue';
import { isAdmin, isGuest, isUser } from '../guards/preGuards.js';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, beforeEnter: isGuest },
  { path: '/register', component: Register, beforeEnter: isGuest },
  { path: '/logout', component: Logout, beforeEnter: isUser },
  { path: '/blog', component: Blog },
  { path: '/blog/by-category/:id', component: ByCategory },
  { path: '/blog/:id', component: SingleArticle, beforeEnter: isUser },
  { path: '/administration/category', component: () => import('../components/administration/category/All.vue'), beforeEnter: isAdmin },
  { path: '/administration/category/create', component: () => import('../components/administration/category/Create.vue'), beforeEnter: isAdmin },
  { path: '/administration/category/update/:id', component: () => import('../components/administration/category/Update.vue'), beforeEnter: isAdmin },
  { path: '/administration/article', component: () => import('../components/administration/article/All.vue'), beforeEnter: isAdmin },
  { path: '/administration/article/create', component: () => import('../components/administration/article/Create.vue'), beforeEnter: isAdmin },
  { path: '/administration/article/update/:id', component: () => import('../components/administration/article/Update.vue'), beforeEnter: isAdmin },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
