// ============================================================
// GTP — Proof Verification
// Kişi 2 ve 3 bunu okuyarak cross-game reward verir
// ============================================================

import { GTPProof, GTPVerifyResult } from "./types"

// Local storage'dan proof oku
export function getStoredProofs(wallet: string): GTPProof[] {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(`gtp_proofs_${wallet}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Proof'u local storage'a yaz
export function storeProof(proof: GTPProof): void {
  if (typeof window === "undefined") return

  const existing = getStoredProofs(proof.playerWallet)
  const updated = [...existing.filter(p => p.proofId !== proof.proofId), proof]
  localStorage.setItem(`gtp_proofs_${proof.playerWallet}`, JSON.stringify(updated))
}

// Tek bir proof'u doğrula
export function verifyProof(proof: GTPProof): GTPVerifyResult {
  if (proof.protocol !== "GTP") {
    return { valid: false, reason: "Not a GTP proof" }
  }
  if (!proof.playerWallet) {
    return { valid: false, reason: "No wallet attached" }
  }
  if (!proof.achievement?.achievementId) {
    return { valid: false, reason: "Missing achievement data" }
  }
  if (proof.expiresAt && proof.expiresAt < Date.now()) {
    return { valid: false, reason: "Proof expired" }
  }

  return { valid: true, proof }
}

// Bir cüzdanda belirli bir oyundan proof var mı?
export function hasProofFromGame(wallet: string, gameId: string): GTPProof | null {
  const proofs = getStoredProofs(wallet)
  return proofs.find(p => p.sourceGame.gameId === gameId) ?? null
}

// Rarity'ye göre proof var mı? (cross-game reward trigger için)
export function hasProofWithRarity(
  wallet: string,
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
): GTPProof | null {
  const proofs = getStoredProofs(wallet)
  return proofs.find(p => p.achievement.rarity === rarity) ?? null
}
