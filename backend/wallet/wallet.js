import { Keypair } from "@solana/web3.js";

// Replace with your private key array
const secret = Uint8Array.from([/* your private key */]);

export const wallet = Keypair.fromSecretKey(secret);