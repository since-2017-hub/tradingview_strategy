<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Login</h2>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    autocomplete="username"
                    placeholder="Enter your email"
                />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    autocomplete="current-password"
                    placeholder="Enter your password"
                />
            </div>
            <button type="submit" :disabled="loading">
                <span v-if="loading">Logging in...</span>
                <span v-else>Login</span>
            </button>
            <p v-if="error" class="error-message">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
    error.value = ''
    loading.value = true
    try {
        // Replace with your actual login logic/API call
        if (email.value === 'user@example.com' && password.value === 'password123') {
            // Simulate successful login
            await new Promise(resolve => setTimeout(resolve, 800))
            router.push('/dashboard')
        } else {
            throw new Error('Invalid email or password')
        }
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f7fa;
}
.login-form {
    background: #fff;
    padding: 2rem 2.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.08);
    width: 100%;
    max-width: 350px;
}
.login-form h2 {
    margin-bottom: 1.5rem;
    text-align: center;
}
.form-group {
    margin-bottom: 1.2rem;
}
.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}
.form-group input {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
}
.form-group input:focus {
    border-color: #2563eb;
}
button[type="submit"] {
    width: 100%;
    padding: 0.8rem;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}
button[type="submit"]:disabled {
    background: #93c5fd;
    cursor: not-allowed;
}
.error-message {
    color: #dc2626;
    margin-top: 1rem;
    text-align: center;
}
</style>