<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Strategy Simulator</h2>
    </div>

    <form @submit.prevent="run" class="flex gap-4 items-end">
      <div>
        <label class="block text-sm text-slate-700">Short MA</label>
        <input type="number" v-model.number="short" min="1" class="mt-1 w-28 rounded border-slate-200" />
      </div>

      <div>
        <label class="block text-sm text-slate-700">Long MA</label>
        <input type="number" v-model.number="long" min="1" class="mt-1 w-28 rounded border-slate-200" />
      </div>

      <div>
        <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded">Run</button>
      </div>
    </form>

    <div v-if="result" class="bg-white rounded shadow p-4">
      <h3 class="font-medium mb-2">Result</h3>
      <p class="text-slate-700">Equity: <span class="font-mono">{{ result.equity }}</span></p>
      <ul class="mt-2 space-y-1 text-slate-600">
        <li v-for="(t, i) in result.trades" :key="i">{{ t.type }} @ {{ t.price }} (i:{{ t.index }})</li>
      </ul>
        <div class="mt-4 flex gap-2">
          <button class="bg-green-600 text-white px-3 py-1 rounded" @click="save">Save</button>
          <button class="bg-slate-200 px-3 py-1 rounded" @click="exportCsv">Export CSV</button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStrategySimulator } from '../../composables/useStrategySimulator'

const short = ref(3)
const long = ref(5)
const result = ref(null as any)

const { simulate } = useStrategySimulator()

function run() {
  result.value = simulate({ short: short.value, long: long.value })
}

function save() {
  const key = 'mvp_sims'
  const raw = localStorage.getItem(key)
  const arr = raw ? JSON.parse(raw) : []
  arr.unshift({ date: Date.now(), params: { short: short.value, long: long.value }, result: result.value })
  localStorage.setItem(key, JSON.stringify(arr))
  alert('Saved')
}

function exportCsv() {
  if (!result.value) return
  const rows = [['type', 'price', 'index']].concat(result.value.trades.map((t: any) => [t.type, t.price, t.index]))
  const csv = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'strategy-trades.csv'; a.click(); URL.revokeObjectURL(url)
}
</script>
