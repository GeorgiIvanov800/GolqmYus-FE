import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterComponent from '@/views/Register/RegisterComponent.vue'
import AlbumView from '@/views/Albums/components/AlbumView.vue'
import SingleAlbumView from '@/views/Albums/components/SingleAlbumView.vue'
import ArtistView from '@/views/Artist/ArtistView.vue'
import QuizView from '@/views/Quiz/QuizView.vue'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'primevue'

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

router.beforeEach((to, from, next) => {
  const toast = useToast()
  const userStore = useUserStore()

  const authRequiredRoutes = ['albums', 'singleAlbum', 'artists', 'quiz']

  if (to.name && authRequiredRoutes.includes(to.name.toString()) && !userStore.isAuthenticated) {
    toast.add({
      severity: 'warn',
      summary: 'Опс не става',
      detail: 'Трябва да си логнат за да може да отвориш страницата ;).',
      life: 3000,
    })
    return next({ name: 'home' })
  }

  next()
})

export default router
