import { getMarketFeatures } from "./ai/features.js";
import { decideRoute } from "./ai/decisionEngine.js";
import { getQuote, getSwapTx } from "./execution/jupiter.js";
import { executeSwap } from "./execution/swap.js";
import { wallet } from "./wallet/wallet.js";
import { Keypair } from "@solana/web3.js";

const keypair = keypair.generate();
console.log("Public Key:", keypair.publicKey.toString());
console.log("Private Key:", Array.from(keypair.secretKey));

async function main() {
  // Example prices
  const priceBefore = 100;
  const priceNow = 95;

  const features = getMarketFeatures(priceNow, priceBefore);
  const decision = decideRoute(features);

  console.log("AI Decision:", decision);

  const inputMint = "So11111111111111111111111111111111111111112"; // SOL
  const outputMint = "Es9vMFrzaCERZ..."; // USDC (replace full)

  const quote = await getQuote({
    inputMint,
    outputMint,
    amount: 10000000, // 0.01 SOL
    slippageBps: decision.slippageBps
  });

  const swapData = await getSwapTx(quote, wallet.publicKey.toString());

  await executeSwap(swapData.swapTransaction);
}

main();