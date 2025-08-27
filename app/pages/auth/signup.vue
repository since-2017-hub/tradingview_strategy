<template>
  <div>
    <form @submit.prevent="handleSignup" class="space-y-4">
      <h2 class="text-xl font-semibold">Create an account</h2>

      <div>
        <label class="block text-sm text-slate-700">Email</label>
        <input v-model="email" type="email" required class="mt-1 block w-full rounded border-slate-200 shadow-sm focus:ring-sky-500 focus:border-sky-500" />
      </div>

      <div>
        <label class="block text-sm text-slate-700">Password</label>
        <input v-model="password" type="password" required class="mt-1 block w-full rounded border-slate-200 shadow-sm focus:ring-sky-500 focus:border-sky-500" />
      </div>

      <div>
        <label class="block text-sm text-slate-700">Confirm Password</label>
        <input v-model="confirmPassword" type="password" required class="mt-1 block w-full rounded border-slate-200 shadow-sm focus:ring-sky-500 focus:border-sky-500" />
      </div>

      <div>
        <button type="submit" class="w-full bg-sky-600 text-white py-2 rounded">Create Account</button>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'auth' })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'


const { signup } = useAuth()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()

async function handleSignup(){
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  try {
    await signup({ email: email.value, password: password.value })
    router.push('/auth/login')
  } catch (err) {
    error.value = err?.message || String(err)
  }
}
</script>
