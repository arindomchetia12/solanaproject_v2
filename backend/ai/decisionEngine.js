export function decideRoute({ volatility }) {
  if (volatility > 0.05) {
    return { slippageBps: 200 }; // 2%
  }
  return { slippageBps: 100 }; // 1%
}