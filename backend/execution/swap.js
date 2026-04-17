import { VersionedTransaction } from "@solana/web3.js";
import { connection } from "../config/solana.js";
import { wallet } from "../wallet/wallet.js";

export async function executeSwap(swapTxBase64) {
  const tx = VersionedTransaction.deserialize(
    Buffer.from(swapTxBase64, "base64")
  );

  tx.sign([wallet]);

  const txid = await connection.sendTransaction(tx);

  console.log("Transaction ID:", txid);
}