<template>
  <div>
    <h2>Strategy Simulator</h2>
    <form @submit.prevent="run">
      <label>Short MA
        <input type="number" v-model.number="short" min="1" />
      </label>
      <label>Long MA
        <input type="number" v-model.number="long" min="1" />
      </label>
      <button type="submit">Run</button>
    </form>

    <div v-if="result">
      <h3>Result</h3>
      <p>Equity: {{ result.equity }}</p>
      <ul>
        <li v-for="(t,i) in result.trades" :key="i">{{ t.type }} @ {{ t.price }} (i:{{ t.index }})</li>
      </ul>
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

function run(){
  result.value = simulate({ short: short.value, long: long.value })
}
</script>

<style scoped>
form { display:flex; gap:1rem; align-items:center }
</style>
