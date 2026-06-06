import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null') || null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    setSession(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearSession() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async login(email, password) {

      const response = await api.post('/auth/login', { email, password })
      const data = response.data || {}
      const token = data.token || data.access_token || data.accessToken
      const user = data.user || data.data || null

      if (!token || !user) {
        throw new Error('Resposta inválida do servidor.')
      }

      this.setSession(token, user)
      return user
    },
  },
})
