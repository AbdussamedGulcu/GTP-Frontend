// ============================================================
// GTP — Demo Trigger (Backend Entegrasyonlu)
// ============================================================

import { createProof } from "./createProof"
import { createMetadata } from "./metadata"
import { storeProof, verifyProof } from "./verify"
import { GTPProof, GTPMetadata } from "./types"

// Backend URL — .env.local'dan gelir
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

// Backend'e proof gönder (hata olsa bile akışı durdurma)
async function syncToBackend(proof: GTPProof): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/submit-proof`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: proof.sourceGame.gameId,
        achievementId: proof.achievement.achievementId,
        playerWallet: proof.playerWallet,
      }),
    })
    const data = await res.json()
    if (data.success) {
      console.log("✅ Backend sync OK — Firebase ID:", data.data.dbId)
      return data.data.dbId
    }
    console.warn("⚠️ Backend sync failed:", data.message)
    return null
  } catch (err) {
    // Backend kapalıysa uygulama çökmez, local çalışmaya devam eder
    console.warn("⚠️ Backend unreachable, running in local-only mode:", err)
    return null
  }
}

export interface ProofFlowResult {
  proof: GTPProof
  metadata: GTPMetadata
  verified: boolean
  storedAt: string
  backendId: string | null  // Firebase doc ID (null = sadece local)
}

export async function generateProofFlow(
  wallet: string,
  gameId: string = "cyber-arena",
  achievementKey: string = "legendary_sword"
): Promise<ProofFlowResult> {

  // 1. Proof oluştur
  const proof = createProof(wallet, gameId as any, achievementKey)

  // 2. Metadata oluştur
  const metadata = createMetadata(proof)

  // 3. Doğrula
  const { valid } = verifyProof(proof)

  // 4. Local storage'a kaydet
  storeProof(proof)

  // 5. 🔥 Backend'e gönder (Firebase)
  const backendId = await syncToBackend(proof)

  console.group("🔐 GTP Proof Created")
  console.log("Protocol:", proof.protocol, proof.version)
  console.log("Proof ID:", proof.proofId)
  console.log("Wallet:", proof.playerWallet)
  console.log("Game:", proof.sourceGame.gameName)
  console.log("Achievement:", proof.achievement.title)
  console.log("Rarity:", proof.achievement.rarity)
  console.log("Verified:", valid)
  console.log("Backend ID:", backendId ?? "local-only")
  console.groupEnd()

  return {
    proof,
    metadata,
    verified: valid,
    storedAt: new Date(proof.issuedAt).toISOString(),
    backendId,
  }
}

// Cross-game: Game B proof okur ve reward verir
export async function readAndRewardFlow(
  wallet: string,
  requiredGameId: string = "cyber-arena",
  requiredRarity: "Legendary" | "Epic" | "Rare" | "Common" = "Legendary"
): Promise<{ rewarded: boolean; reward?: string; proof?: GTPProof }> {
  const { hasProofFromGame } = await import("./verify")

  const proof = hasProofFromGame(wallet, requiredGameId)

  if (!proof) {
    console.log(`❌ No proof found from ${requiredGameId}`)
    return { rewarded: false }
  }

  if (proof.achievement.rarity !== requiredRarity) {
    console.log(`❌ Proof found but rarity is ${proof.achievement.rarity}, required ${requiredRarity}`)
    return { rewarded: false }
  }

  const reward = "Galaxy Car — Exclusive Skin"
  console.log(`✅ Cross-game reward unlocked: ${reward}`)

  return { rewarded: true, reward, proof }
}