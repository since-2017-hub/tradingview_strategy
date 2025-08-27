<template>
  <div>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <h2 class="text-xl font-semibold">Sign in to your account</h2>

      <div>
        <label class="block text-sm text-slate-700">Email</label>
        <input v-model="email" type="email" required class="mt-1 block w-full rounded border-slate-200 shadow-sm focus:ring-sky-500 focus:border-sky-500" />
      </div>

      <div>
        <label class="block text-sm text-slate-700">Password</label>
        <input v-model="password" type="password" required class="mt-1 block w-full rounded border-slate-200 shadow-sm focus:ring-sky-500 focus:border-sky-500" />
      </div>

      <div>
        <button type="submit" class="w-full bg-sky-600 text-white py-2 rounded">Login</button>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <p class="text-sm text-slate-600">Don't have an account? <NuxtLink class="text-sky-600" to="/auth/signup">Sign up</NuxtLink></p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const { login } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin(){
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password'
    return
  }
  try {
    const token = await login({ email: email.value, password: password.value })
    if (token) {
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = err?.message || String(err)
  }
}
</script>
