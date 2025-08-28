import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuth } from '../composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  // if page meta requires auth, redirect to login
  if (to.meta && (to.meta as any).auth) {
    const auth = useAuth()
    if (!auth.isAuthenticated()) return navigateTo('/auth/login')
  }
})
