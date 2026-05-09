// ============================================================
// GTP — Gaming Transfer Protocol
// Proof Type Definitions v0.1
// ============================================================

export interface GTPProof {
  protocol: "GTP"
  version: "0.1"

  proofId: string
  proofType: "achievement" | "asset"

  playerWallet: string

  sourceGame: {
    gameId: string
    gameName: string
  }

  achievement: {
    achievementId: string
    title: string
    description: string
    rarity?: "Common" | "Rare" | "Epic" | "Legendary"
  }

  issuedAt: number
  expiresAt?: number // opsiyonel — bazı proof'lar süreli olabilir
}

export interface GTPMetadata {
  name: string
  description: string
  image?: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  proof: GTPProof
}

export interface GTPVerifyResult {
  valid: boolean
  reason?: string
  proof?: GTPProof
}
