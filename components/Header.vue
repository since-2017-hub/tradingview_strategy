<template>
  <header class="bg-slate-900 text-white">
    <div class="max-w-6xl mx-auto flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="text-lg font-bold">TradingView Strategy</NuxtLink>
        <span class="hidden md:inline text-slate-300">MVP</span>
      </div>

      <nav class="hidden md:flex items-center gap-3">
        <NuxtLink class="text-slate-300 hover:text-white" to="/">Home</NuxtLink>
        <NuxtLink class="text-slate-300 hover:text-white" to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink class="text-slate-300 hover:text-white" to="/strategy">Strategy</NuxtLink>
        <NuxtLink class="text-slate-300 hover:text-white" to="/watchlist">Watchlist</NuxtLink>
        <NuxtLink class="text-slate-300 hover:text-white" to="/chart">Chart</NuxtLink>
      </nav>

    </div>
  </header>
</template>

<script setup>
</script>
