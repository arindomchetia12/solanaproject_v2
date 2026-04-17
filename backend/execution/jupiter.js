import fetch from "node-fetch";

export async function getQuote({ inputMint, outputMint, amount, slippageBps }) {
  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;

  const res = await fetch(url);
  return await res.json();
}

export async function getSwapTx(quote, userPublicKey) {
  const res = await fetch("https://quote-api.jup.ag/v6/swap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      quoteResponse: quote,
      userPublicKey,
      wrapAndUnwrapSol: true
    })
  });

  return await res.json();
}