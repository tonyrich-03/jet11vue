import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import TodosPage from '../pages/TodosPage.vue';
import TestError from '../pages/TestError.vue'; // TestError path
import '../router/styles.css'; // Importing router styles
import NotFoundPage from '../pages/NotFoundPage.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/todos', component: TodosPage },
  { path: '/test', component: TestError }, // route path
  { path: '/:pathMatch(.*)*', component: NotFoundPage}, // route path
  { path: '/Boundary(.*)', component: ErrorBoundary} // route path
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
