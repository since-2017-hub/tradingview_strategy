<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
      <p class="hint">Don't have an account? <NuxtLink to="/auth/signup">Sign up</NuxtLink></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../../composables/useAuth'

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
    // Replace with actual API call. Here we simulate and accept any credentials.
    const token = await login({ email: email.value, password: password.value })
    if (token) {
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = err?.message || String(err)
  }
}
</script>

<style scoped>
.login-container { max-width:420px; margin:40px auto }
.login-form { background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.06) }
.login-form h2 { margin-bottom:12px }
.login-form input { display:block; width:100%; margin:8px 0 12px; padding:8px }
.error { color:#c00 }
</style>
