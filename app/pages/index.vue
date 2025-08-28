<template>
  <div class="max-w-4xl mx-auto py-12">
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold mb-2">TradingView Strategy — MVP</h2>
      <p class="text-slate-600 mb-4">Quick start: create a strategy, simulate it on sample data, save results and export trades.</p>
      <div class="flex gap-3">
        <NuxtLink class="inline-block bg-sky-600 text-white px-4 py-2 rounded" to="/strategy">Strategy Simulator</NuxtLink>
        <NuxtLink class="inline-block border border-slate-200 px-4 py-2 rounded" to="/dashboard">Dashboard</NuxtLink>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 border rounded">
          <h3 class="font-medium">Simulator</h3>
          <p class="text-sm text-slate-600">Build SMA strategies and simulate on sample data.</p>
        </div>
        <div class="p-4 border rounded">
          <h3 class="font-medium">Watchlist</h3>
          <p class="text-sm text-slate-600">Track symbols and jump to charts quickly.</p>
        </div>
        <div class="p-4 border rounded">
          <h3 class="font-medium">Export</h3>
          <p class="text-sm text-slate-600">Export simulated trades to CSV for further analysis.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
