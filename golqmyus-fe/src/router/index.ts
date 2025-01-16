import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterComponent from '@/views/Register/RegisterComponent.vue'
import AlbumView from '@/views/Albums/components/AlbumView.vue'
import SingleAlbumView from '@/views/Albums/components/SingleAlbumView.vue'
import ArtistView from '@/views/Artist/ArtistView.vue'
import QuizView from '@/views/Quiz/QuizView.vue'

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
      path: '/albums/:artistId?',
      name: 'albums',
      component: AlbumView,
      children: [{ path: ':id', name: 'singleAlbum', component: SingleAlbumView }],
    },
    { path: '/artists', name: 'artists', component: ArtistView },
    { path: '/quiz', name: 'quiz', component: QuizView },
  ],
})

export default router
