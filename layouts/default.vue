<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <header class="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="text-xl font-bold">TradingView Strategy</div>
        <span class="hidden md:inline text-slate-300">MVP</span>
      </div>

      <nav class="flex items-center gap-3">
        <NuxtLink class="text-slate-300 hover:text-white" to="/">Home</NuxtLink>
        <NuxtLink class="text-slate-300 hover:text-white" to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink class="text-slate-300 hover:text-white" to="/strategy">Strategy</NuxtLink>
        <template v-if="!auth.isAuthenticated()">
          <NuxtLink class="text-slate-300 hover:text-white" to="/auth/login">Login</NuxtLink>
          <NuxtLink class="text-slate-300 hover:text-white" to="/auth/signup">Signup</NuxtLink>
        </template>
        <template v-else>
          <span class="text-slate-200 mr-2">Connected</span>
          <button class="bg-red-600 text-white px-3 py-1 rounded" @click="auth.logout()">Logout</button>
        </template>
      </nav>
    </header>

    <div class="flex flex-1">
      <aside class="hidden md:block w-64 bg-slate-800 text-slate-200 p-4">
        <ul class="space-y-2">
          <li><NuxtLink class="block p-2 rounded hover:bg-slate-700" to="/">Home</NuxtLink></li>
          <li><NuxtLink class="block p-2 rounded hover:bg-slate-700" to="/dashboard">Dashboard</NuxtLink></li>
          <li><NuxtLink class="block p-2 rounded hover:bg-slate-700" to="/strategy">Strategy Simulator</NuxtLink></li>
          <li><NuxtLink class="block p-2 rounded hover:bg-slate-700" to="/watchlist">Watchlist</NuxtLink></li>
          <li><NuxtLink class="block p-2 rounded hover:bg-slate-700" to="/chart">Chart</NuxtLink></li>
        </ul>
      </aside>

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
const auth = useAuth()
</script>

<!-- Tailwind utilities used; no scoped CSS required -->
