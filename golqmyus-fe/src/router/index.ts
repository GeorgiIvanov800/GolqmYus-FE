import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterComponent from '@/views/Register/RegisterComponent.vue'
import AlbumView from '@/views/Albums/components/AlbumView.vue'
import SingleAlbumView from '@/views/Albums/components/SingleAlbumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/register', name: 'register', component: RegisterComponent },
    {
      path: '/albums',
      name: 'albums',
      component: AlbumView,
      children: [{ path: ':id', name: 'singleAlbum', component: SingleAlbumView }],
    },
  ],
})

export default router
