export function useStrategySimulator() {
  // very small simulator: runs a moving average crossover strategy on sample price array
  const samplePrices = [
    100, 101, 102, 101, 100, 99, 100, 102, 104, 106, 105, 107,
  ];

  function simulate({ short = 3, long = 5 } = {}) {
    const prices = samplePrices;
    const result = {
      trades: [] as { type: "buy" | "sell"; price: number; index: number }[],
      equity: 1000,
    };
    const shortMa = (arr: number[], idx: number) => {
      const start = Math.max(0, idx - short + 1);
      const slice = arr.slice(start, idx + 1);
      return slice.reduce((s, v) => s + v, 0) / slice.length;
    };
    const longMa = (arr: number[], idx: number) => {
      const start = Math.max(0, idx - long + 1);
      const slice = arr.slice(start, idx + 1);
      return slice.reduce((s, v) => s + v, 0) / slice.length;
    };

    let position = 0;
    for (let i = 0; i < prices.length; i++) {
      const s = shortMa(prices, i);
      const l = longMa(prices, i);
      if (i === 0) continue;
      if (s > l && position === 0) {
        // buy
        position = 1;
        if (typeof prices[i] === "number") {
          result.trades.push({ type: "buy", price: prices[i] as number, index: i });
        }
      } else if (s < l && position === 1) {
        // sell
        position = 0;
        if (typeof prices[i] === "number") {
          result.trades.push({ type: "sell", price: prices[i] as number, index: i });
        }
      }
    }
    // calculate equity naive
    for (let t = 0; t < result.trades.length; t += 2) {
      const buy = result.trades[t];
      const sell = result.trades[t + 1];
      if (buy && sell) {
        const pnl = sell.price - buy.price;
        result.equity += pnl * 1; // 1 share
      }
    }
    return result;
  }

  return { simulate };
}
