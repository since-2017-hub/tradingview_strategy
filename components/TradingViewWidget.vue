<template>
  <div class="tradingview-widget-container w-full">
    <div :id="containerId" class="w-full" style="height:420px"></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
const props = defineProps({ symbol: { type: String, required: true } })
const containerId = 'tv_' + Math.random().toString(36).slice(2)

function mapSymbol(s){
  if (!s) return s
  const u = s.toUpperCase()
  // common mappings, allow passing full TradingView symbol as-is
  if (u === 'BTC-USD' || u === 'BTCUSD') return 'BINANCE:BTCUSDT'
  if (u === 'ETH-USD' || u === 'ETHUSD') return 'BINANCE:ETHUSDT'
  if (u.includes('AAPL')) return 'NASDAQ:AAPL'
  if (u.includes('NASDAQ') || u.includes(':')) return s // already full tv symbol
  // fallback: replace '-' with ':'? leave as provided
  return s
}

function ensureScript(){
  if (window.TradingView) return Promise.resolve()
  return new Promise((resolve, reject)=>{
    const id = 'tradingview-tv-js'
    if (document.getElementById(id)) {
      // already loading
    const check = setInterval(()=>{ if (window.TradingView){ clearInterval(check); resolve() } }, 200)
      return
    }
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://s3.tradingview.com/tv.js'
    s.onload = ()=>resolve()
    s.onerror = (e)=>reject(e)
    document.head.appendChild(s)
  })
}

let widget = null
async function mountWidget(){
  await ensureScript()
  const symbol = mapSymbol(props.symbol)
  try { if (widget && widget.remove) widget.remove() } catch(e) {}
  // create the TradingView widget
  widget = new window.TradingView.widget({
    container_id: containerId,
    autosize: true,
    symbol: symbol,
    interval: 'D',
    timezone: 'Etc/UTC',
    theme: 'Light',
    style: '1',
    locale: 'en',
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    allow_symbol_change: true,
    details: true,
    withdateranges: true,
    hide_side_toolbar: false,
    studies: ['MACD@tv-basicstudies']
  })
}

onMounted(()=>{ mountWidget().catch(()=>{}) })
watch(()=>props.symbol, ()=>{ mountWidget().catch(()=>{}) })
</script>

<style scoped>
.tradingview-widget-container { min-height: 320px }
</style>
