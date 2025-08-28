import { createChart } from 'lightweight-charts'

function mulberry32(a:number){
  return function(){
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function hashString(s: string){
  let h = 2166136261 >>> 0
  for (let i=0;i<s.length;i++){
    h ^= s.charCodeAt(i)
    h = Math.imul(h,16777619) >>> 0
  }
  return h
}

export function lightweightChartExample(selector: string | HTMLElement, symbol = 'AAPL') {
  const container = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!container) return
  const el = container as HTMLElement
  // clear previous content
  el.innerHTML = ''

  const chart = createChart(el, { width: el.clientWidth, height: 320 })
  const series = chart.addLineSeries()

  const now = Date.now()
  const seed = hashString(symbol || 'default')
  const rnd = mulberry32(seed)

  // choose a base price depending on symbol
  let base = 100
  const s = symbol.toUpperCase()
  if (s.includes('BTC')) base = 30000
  else if (s.includes('ETH')) base = 1800
  else if (s.includes('AAPL') || s.includes('APPL')) base = 150
  else if (s.includes('USD')) base = 1

  const data = Array.from({length: 120}).map((_,i)=>{
    const d = new Date(now - (120-i)*24*60*60*1000)
    const dateStr = d.toISOString().slice(0,10)
    // create a walk
    const v = base + (rnd()-0.5) * base * 0.05 + Math.sin(i/6 + seed%10) * base * 0.02
    return { time: dateStr, value: Number(v.toFixed(2)) }
  })

  series.setData(data)
  window.addEventListener('resize', ()=>chart.applyOptions({ width: el.clientWidth }))
  return chart
}
