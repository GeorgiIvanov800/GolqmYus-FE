import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(ToastService)
app.use(PrimeVue, {
  theme: 'none',
})
app.mount('#app')
