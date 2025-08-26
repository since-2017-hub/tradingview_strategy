<template>
  <div class="signup-container">
    <form @submit.prevent="handleSignup" class="signup-form">
      <h2>Sign Up</h2>
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <div>
        <label>Confirm</label>
        <input v-model="confirmPassword" type="password" required />
      </div>
      <button type="submit">Create Account</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../../composables/useAuth'


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
    // demo-only signup: persist locally via composable
    await signup({ email: email.value, password: password.value })
    router.push('/auth/login')
  } catch (err) {
    error.value = err?.message || String(err)
  }
}
</script>

<style scoped>
.signup-container { max-width:420px; margin:40px auto }
.signup-form { background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,0.06) }
.signup-form input { display:block; width:100%; margin:8px 0 12px; padding:8px }
.error { color:#c00 }
</style>
