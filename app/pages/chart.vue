<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Chart</h2>
  <div ref="chartEl" class="w-full bg-white rounded shadow h-[400px]"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { createChart } from 'lightweight-charts'

const chartEl = ref<HTMLElement | null>(null)

onMounted(()=>{
  if (!chartEl.value) return
  const chart = createChart(chartEl.value, { width: chartEl.value.clientWidth, height: 400 })
  const line = chart.addLineSeries()
  // sample data
  const data = [
    { time: '2022-01-01', value: 100 },
    { time: '2022-01-02', value: 102 },
    { time: '2022-01-03', value: 101 },
    { time: '2022-01-04', value: 103 },
    { time: '2022-01-05', value: 105 }
  ]
  line.setData(data)
})
</script>

<style scoped>
</style>
