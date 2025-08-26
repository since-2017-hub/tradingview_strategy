<template>
    <div class="signup-container">
        <h1>Sign Up</h1>
        <form @submit.prevent="handleSignup">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input v-model="confirmPassword" type="password" id="confirmPassword" required />
            </div>
            <button type="submit">Sign Up</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSignup = () => {
    error.value = ''
    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.'
        return
    }
    // TODO: Implement actual signup logic (API call)
    alert('Signup successful!')
}
</script>

<style scoped>
.signup-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fff;
}
.form-group {
    margin-bottom: 16px;
}
label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
}
input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
}
.error {
    color: #d00;
    margin-top: 12px;
    text-align: center;
}
</style>