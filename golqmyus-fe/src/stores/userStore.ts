import { defineStore } from 'pinia'

interface UserState {
  token: string | null
  username: string | null
  imgUrl: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    username: null,
    imgUrl: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    login(token: string, username: string, imgUrl: string) {
      if (!token || !username) {
        throw new Error('Invalid token or username')
      }
      this.token = token
      this.username = username
      this.imgUrl = imgUrl
    },
    logout() {
      this.token = null
      this.username = null
      this.imgUrl = null
    },
  },
  persist: true,
})
