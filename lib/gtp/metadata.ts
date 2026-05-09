// ============================================================
// GTP — Metadata Generator
// NFT metadata standardı (Metaplex uyumlu)
// ============================================================

import { GTPProof, GTPMetadata } from "./types"

export function createMetadata(proof: GTPProof): GTPMetadata {
  return {
    name: `GTP Proof: ${proof.achievement.title}`,
    description: proof.achievement.description,

    // Gerçek sistemde IPFS / Arweave URL gelir
    image: `https://placeholder.gtp.dev/${proof.sourceGame.gameId}/${proof.achievement.achievementId}.png`,

    attributes: [
      { trait_type: "Protocol",    value: proof.protocol },
      { trait_type: "Version",     value: proof.version },
      { trait_type: "Game",        value: proof.sourceGame.gameName },
      { trait_type: "Achievement", value: proof.achievement.title },
      { trait_type: "Rarity",      value: proof.achievement.rarity ?? "Common" },
      { trait_type: "Wallet",      value: proof.playerWallet },
      { trait_type: "Issued At",   value: new Date(proof.issuedAt).toISOString() },
    ],

    proof, // raw proof — on-chain metadata'da taşınır
  }
}
