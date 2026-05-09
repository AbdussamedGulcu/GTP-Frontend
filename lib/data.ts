import { Sword, Shield, Crown, Gem, PackageOpen, ChevronsUp, Gift, Zap } from "lucide-react"

export const marketplaceOffers = [
  {
    id: 1,
    name: "Legendary Plasma Blade",
    game: "Cyber Legends",
    price: 450,
    rarity: "Legendary",
    icon: Sword,
    description: "A devastating energy weapon forged in the heart of a dying star.",
    owners: 234,
    bonus: "+45% DMG",
  },
  {
    id: 2,
    name: "Void Shield Module",
    game: "Void Runners",
    price: 280,
    rarity: "Epic",
    icon: Shield,
    description: "Advanced defensive technology from the Void dimension.",
    owners: 567,
    bonus: "+30% DEF",
  },
  {
    id: 3,
    name: "Neon Crown",
    game: "Neon Strike",
    price: 750,
    rarity: "Mythic",
    icon: Crown,
    description: "The ultimate symbol of power in the neon-lit underworld.",
    owners: 89,
    bonus: "+100% XP",
  },
  {
    id: 4,
    name: "Crystal Core Gem",
    game: "Cyber Legends",
    price: 120,
    rarity: "Rare",
    icon: Gem,
    description: "A rare crystal that amplifies your abilities.",
    owners: 1234,
    bonus: "+15% ALL",
  },
  {
    id: 5,
    name: "Founder's Crate",
    game: "Galaxy Conquest",
    price: 1500,
    rarity: "Mythic",
    icon: PackageOpen,
    description: "Exclusive items for early adopters of the expanding universe.",
    owners: 12,
    bonus: "Unique",
  },
  {
    id: 6,
    name: "Double XP Boost",
    game: "All Games",
    price: 50,
    rarity: "Rare",
    icon: ChevronsUp,
    description: "Gain 2x experience points across all connected titles for 24h.",
    owners: 8432,
    bonus: "24h",
  },
  {
    id: 7,
    name: "Neon Skin Pack",
    game: "Neon Strike",
    price: 320,
    rarity: "Epic",
    icon: Gift,
    description: "A bundle of 5 exclusive neon-themed skins for your characters.",
    owners: 412,
    bonus: "Cosmetic",
  },
  {
    id: 8,
    name: "Hyperdrive Engine",
    game: "Void Runners",
    price: 600,
    rarity: "Legendary",
    icon: Zap,
    description: "Upgraded propulsion system that allows instant teleportation.",
    owners: 156,
    bonus: "+80% SPD",
  }
]

export const rarityColors: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  Rare: { text: "text-neon-teal", bg: "bg-neon-teal/15", border: "border-neon-teal/40", glow: "shadow-[0_0_20px_rgba(10,158,184,0.3)]" },
  Epic: { text: "text-neon-purple", bg: "bg-neon-purple/15", border: "border-neon-purple/40", glow: "shadow-[0_0_20px_rgba(139,42,168,0.3)]" },
  Legendary: { text: "text-neon-green", bg: "bg-neon-green/15", border: "border-neon-green/40", glow: "shadow-[0_0_20px_rgba(46,204,64,0.3)]" },
  Mythic: { text: "text-amber-400", bg: "bg-amber-400/15", border: "border-amber-400/40", glow: "shadow-[0_0_20px_rgba(251,191,36,0.3)]" },
}

export type Game = {
  id: number
  name: string
  achievements: number
  connected: boolean
  level: number
  hoursPlayed: number
}

export const allAvailableGames: Game[] = [
  { id: 1, name: "A Oyunu", achievements: 0, connected: true, level: 1, hoursPlayed: 0 },
  { id: 2, name: "B Oyunu", achievements: 0, connected: true, level: 1, hoursPlayed: 0 },
]
