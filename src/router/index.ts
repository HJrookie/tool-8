import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "MainWindow" */ '@/views/MainWindow.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
