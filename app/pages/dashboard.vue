<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Dashboard</h2>
      <NuxtLink class="text-sky-600" to="/strategy">New Simulation</NuxtLink>
    </div>

    <div class="bg-white rounded shadow p-4">
      <h3 class="font-medium mb-2">Recent simulations</h3>
      <ul class="text-slate-600">
        <li>No simulations yet.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>
