import { createChart } from 'lightweight-charts'

export function lightweightChartExample(selector: string | HTMLElement) {
  const container = typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!container) return
  const chart = createChart(container as HTMLElement, { width: (container as HTMLElement).clientWidth, height: 300 })
  const series = chart.addLineSeries()
  const now = Date.now()
  const data = Array.from({length: 80}).map((_,i)=>{
    const d = new Date(now - (80-i)*60*1000)
    const dateStr = d.toISOString().slice(0,10)
    return { time: dateStr, value: Math.sin(i/5) * 10 + 100 }
  })
  series.setData(data)
  window.addEventListener('resize', ()=>chart.applyOptions({ width: (container as HTMLElement).clientWidth }))
  return chart
}
