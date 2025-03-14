import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardView from '../views/BoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/board/',
      name: 'board',
      component: BoardView,
    },
    {
      path: '/board/:id',
      name: 'boardDetail',
      component: import('../components/BoardDetail.vue'),
      props: true
    },
    {
      path: '/board/create',
      name: 'boardCreate',
      component: () => import('../components/BoardForm.vue'),
    },
    {
      path: '/board/:id/edit',
      name: 'boardEdit',
      component: () => import('../components/BoardForm.vue'),
      props: true
    }
  ],
})

export default router
