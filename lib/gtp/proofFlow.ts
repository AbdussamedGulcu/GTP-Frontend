// ============================================================
// GTP — Demo Trigger
// Frontend bu fonksiyonu çağırır, her şey burada birleşir
// ============================================================

import { createProof } from "./createProof"
import { createMetadata } from "./metadata"
import { storeProof, verifyProof } from "./verify"
import { GTPProof, GTPMetadata } from "./types"

export interface ProofFlowResult {
  proof: GTPProof
  metadata: GTPMetadata
  verified: boolean
  storedAt: string
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

  // 4. Local storage'a kaydet (Kişi 2 ve 3 buradan okuyacak)
  storeProof(proof)

  // Demo için console output
  console.group("🔐 GTP Proof Created")
  console.log("Protocol:", proof.protocol, proof.version)
  console.log("Proof ID:", proof.proofId)
  console.log("Wallet:", proof.playerWallet)
  console.log("Game:", proof.sourceGame.gameName)
  console.log("Achievement:", proof.achievement.title)
  console.log("Rarity:", proof.achievement.rarity)
  console.log("Verified:", valid)
  console.groupEnd()

  console.group("📦 GTP Metadata")
  console.log(JSON.stringify(metadata, null, 2))
  console.groupEnd()

  return {
    proof,
    metadata,
    verified: valid,
    storedAt: new Date(proof.issuedAt).toISOString(),
  }
}

// Cross-game: Game B proof okur ve reward verir
export async function readAndRewardFlow(
  wallet: string,
  requiredGameId: string = "cyber-arena",
  requiredRarity: "Legendary" | "Epic" | "Rare" | "Common" = "Legendary"
): Promise<{ rewarded: boolean; reward?: string; proof?: GTPProof }> {
  const { hasProofWithRarity, hasProofFromGame } = await import("./verify")

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
  console.log(`   Proof from: ${proof.sourceGame.gameName}`)
  console.log(`   Achievement: ${proof.achievement.title}`)

  return { rewarded: true, reward, proof }
}
