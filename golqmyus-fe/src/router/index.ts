import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterComponent from '@/views/Register/RegisterComponent.vue'
import AlbumComponent from '@/views/Albums/components/AlbumComponent.vue'
import AlbumBook from '@/views/Albums/components/AlbumBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/register', name: 'register', component: RegisterComponent },
    { path: '/albums', name: 'albums', component: AlbumBook },
  ],
})

export default router
