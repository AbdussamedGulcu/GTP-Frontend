// ============================================================
// GTP — Proof Creation
// ============================================================

import { GTPProof } from "./types"

// Demo achievement registry — gerçek sistemde game tarafından gelir
const ACHIEVEMENTS = {
  "cyber-arena": {
    legendary_sword: {
      achievementId: "legendary_sword",
      title: "Legendary Sword Holder",
      description: "Obtained the Dragon Sword — rarest weapon in Cyber Arena",
      rarity: "Legendary" as const,
    },
    arena_champion: {
      achievementId: "arena_champion",
      title: "Arena Champion",
      description: "Reached top rank in Cyber Arena competitive mode",
      rarity: "Epic" as const,
    },
  },
  "space-kart": {
    galaxy_pilot: {
      achievementId: "galaxy_pilot",
      title: "Galaxy Pilot",
      description: "Unlocked the Galaxy Car in Space Kart",
      rarity: "Rare" as const,
    },
  },
}

export function createProof(
  wallet: string,
  gameId: keyof typeof ACHIEVEMENTS = "cyber-arena",
  achievementKey: string = "legendary_sword"
): GTPProof {
  const gameAchievements = ACHIEVEMENTS[gameId]
  const achievement =
    gameAchievements[achievementKey as keyof typeof gameAchievements] ??
    gameAchievements["legendary_sword" as keyof typeof gameAchievements]

  const gameNames: Record<string, string> = {
    "cyber-arena": "Cyber Arena",
    "space-kart": "Space Kart",
  }

  return {
    protocol: "GTP",
    version: "0.1",

    proofId: `proof_${gameId}_${achievementKey}_${Date.now()}`,
    proofType: "achievement",

    playerWallet: wallet,

    sourceGame: {
      gameId,
      gameName: gameNames[gameId] ?? gameId,
    },

    achievement,

    issuedAt: Date.now(),
  }
}
