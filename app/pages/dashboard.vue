<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Dashboard</h2>
      <NuxtLink class="text-sky-600" to="/strategy">New Simulation</NuxtLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="col-span-2 bg-white rounded shadow p-4">
          <div class="flex items-center justify-between">
            <h3 class="font-medium mb-2">Chart — <span class="font-normal">{{ active }}</span></h3>
          </div>
          <!-- Official TradingView widget -->
          <TradingViewWidget :symbol="active" />
          <!-- lightweight fallback in case tradingview script is blocked -->
          <div id="tv_chart" class="w-full h-72 bg-slate-50 border rounded hidden"></div>
        </div>

      <div class="bg-white rounded shadow p-4">
        <h3 class="font-medium mb-2">Watchlist</h3>
        <ul class="divide-y">
          <li v-for="s in watchlist" :key="s" class="py-2">
            <button class="w-full text-left px-2 py-1 rounded hover:bg-slate-50" :class="{ 'bg-sky-50': s === active }" @click="selectSymbol(s)">{{ s }}</button>
          </li>
        </ul>

        <div class="mt-4">
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
  </div>
</template>

<script setup>
import Card from '~/components/Card.vue'
import { ref, onMounted } from 'vue'
import { useFirebase } from '~/composables/useFirebase'
import { lightweightChartExample } from '~/utils/chart'
import TradingViewWidget from '~/components/TradingViewWidget.vue'

const sims = ref([])
const watchlist = ref(['BTC-USD','AAPL','ETH-USD'])
const active = ref(watchlist.value[0])

onMounted(()=>{
  const raw = localStorage.getItem('mvp_sims')
  sims.value = raw ? JSON.parse(raw) : []

  // draw chart for the first watchlist symbol
  try {
    lightweightChartExample('#tv_chart', active.value)
  } catch (e) {
    // ignore if library isn't present
  }
})

function selectSymbol(sym){
  active.value = sym
  try { lightweightChartExample('#tv_chart', sym) } catch (e) {}
}
definePageMeta({ auth: true })
</script>
