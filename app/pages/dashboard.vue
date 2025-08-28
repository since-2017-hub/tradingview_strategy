<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Dashboard</h2>
      <NuxtLink class="text-sky-600" to="/strategy">New Simulation</NuxtLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="col-span-2 bg-white rounded shadow p-4">
        <h3 class="font-medium mb-2">Chart</h3>
        <!-- TradingView lightweight placeholder - replace with official widget if needed -->
        <div id="tv_chart" class="w-full h-72 bg-slate-50 border rounded"></div>
      </div>

      <div class="bg-white rounded shadow p-4">
        <h3 class="font-medium mb-2">Recent simulations</h3>
        <ul class="text-slate-600">
          <li v-if="!sims.length">No simulations yet.</li>
          <li v-for="(s,i) in sims" :key="i">
            <Card>
              <div class="flex items-start justify-between">
                <div>
                  <div class="text-sm text-slate-700">{{ new Date(s.date).toLocaleString() }}</div>
                  <div class="text-sm">Short: {{ s.params.short }}, Long: {{ s.params.long }}</div>
                </div>
                <div class="text-right">
                  <div class="mono">Equity: {{ s.result.equity }}</div>
                </div>
              </div>
            </Card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from '~/components/Card.vue'
import { ref, onMounted } from 'vue'
import { useFirebase } from '~/composables/useFirebase'
import { lightweightChartExample } from '~/utils/chart'

const sims = ref([])
onMounted(()=>{
  const raw = localStorage.getItem('mvp_sims')
  sims.value = raw ? JSON.parse(raw) : []

  // draw a simple example chart in the container
  try {
    lightweightChartExample('#tv_chart')
  } catch (e) {
    // ignore if library isn't present
    // console.warn('chart init failed', e)
  }
})
definePageMeta({ auth: true })
</script>
