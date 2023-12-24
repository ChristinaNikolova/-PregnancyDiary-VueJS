import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Blog from '../components/blog/All.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
