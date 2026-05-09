// ============================================================
// GTP — Solana Connection + Wallet Helper
// ============================================================

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

// Phantom wallet bağlantısı
export async function connectWallet(): Promise<string> {
  const provider = (window as any).solana

  if (!provider?.isPhantom) {
    throw new Error("Phantom wallet not found. Please install it from phantom.app")
  }

  const response = await provider.connect()
  return response.publicKey.toString()
}

// Bağlantıyı kes
export async function disconnectWallet(): Promise<void> {
  const provider = (window as any).solana
  if (provider) await provider.disconnect()
}

// Bağlı mı kontrol et
export function getConnectedWallet(): string | null {
  const provider = (window as any).solana
  if (provider?.isConnected && provider?.publicKey) {
    return provider.publicKey.toString()
  }
  return null
}

// Devnet SOL bakiyesi
export async function getBalance(walletAddress: string): Promise<number> {
  const pubkey = new PublicKey(walletAddress)
  const lamports = await connection.getBalance(pubkey)
  return lamports / 1e9 // SOL cinsinden
}

// Explorer linki üret
export function getExplorerUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`
}
