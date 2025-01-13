import { defineStore } from 'pinia'

interface UserState {
  token: string | null
  username: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    username: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    login(token: string, username: string) {
      this.token = token
      this.username = username
    },
    logout() {
      this.token = null
      this.username = null
    },
  },
  persist: true,
})
