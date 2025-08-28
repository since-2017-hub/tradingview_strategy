<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
  <Header />

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

      <main class="flex-1 p-6 max-w-6xl mx-auto w-full">
        <slot />
      </main>
    </div>
    <footer class="bg-white border-t mt-8">
      <div class="max-w-6xl mx-auto p-4 text-sm text-slate-600 flex justify-between">
        <div>© { new Date().getFullYear() } TradingView Strategy</div>
        <div><NuxtLink to="/" class="text-sky-600">Home</NuxtLink></div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { ref } from 'vue'
const auth = useAuth()
const open = ref(false)
</script>

<!-- Tailwind utilities used; no scoped CSS required -->
