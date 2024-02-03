import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Blog from '../components/blog/article/All.vue';
import ByCategory from '../components/blog/article/ByCategory.vue';
import SingleArticle from '../components/blog/article/Details.vue';
import AllDiaries from '../components/diary/All.vue';
import DetailsDiary from '../components/diary/Details.vue';
import CreateDiary from '../components/diary/Create.vue';
import UpdateDiary from '../components/diary/Update.vue';
import DetailsWeek from '../components/diary//week/Details.vue';
import FavouriteArticles from '../components/user/FavouriteArticles.vue';
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
  { path: '/blog/by-category/:name/:id', component: ByCategory },
  { path: '/blog/:id', component: SingleArticle, beforeEnter: isUser },
  { path: '/diary', component: AllDiaries, beforeEnter: isUser },
  { path: '/diary/:id', component: DetailsDiary, beforeEnter: isUser },
  { path: '/diary/create', component: CreateDiary, beforeEnter: isUser },
  { path: '/diary/update/:id', component: UpdateDiary, beforeEnter: isUser },
  { path: '/diary/:diaryId/:weekId', component: DetailsWeek, beforeEnter: isUser },
  { path: '/user/favourite-articles', component: FavouriteArticles, beforeEnter: isUser },
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
