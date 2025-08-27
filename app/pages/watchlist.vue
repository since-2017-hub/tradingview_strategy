<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Watchlist</h2>
    </div>

    <div class="bg-white rounded shadow p-4">
      <ul class="space-y-2 text-slate-700">
        <li v-for="(s,i) in list" :key="i" class="py-1">{{ s }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const list = ['AAPL', 'TSLA', 'BTCUSD', 'ETHUSD']
</script>
