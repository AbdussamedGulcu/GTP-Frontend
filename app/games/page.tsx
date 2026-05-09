"use client"

import { Gamepad2 } from "lucide-react"
import { allAvailableGames } from "@/lib/data"
import { GameCard } from "@/components/connected-games"
import { useAppContext } from "@/lib/context"
import { PageTransition } from "@/components/page-transition"
import { useMemo } from "react"

export default function GamesPage() {
  const { connectedGames } = useAppContext()

  // We want to show all available games, but their connected state should come from the context
  // so if we click connect here, it reflects across the app.
  const mergedGames = useMemo(() => {
    return allAvailableGames.map(availableGame => {
      const globalGame = connectedGames.find(g => g.id === availableGame.id)
      return globalGame || availableGame
    })
  }, [connectedGames])

  return (
    <PageTransition>
      <main className="content-layer container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[#39db67]/20 flex items-center justify-center shadow-[0_0_20px_rgba(57,219,103,0.3)]">
            <Gamepad2 className="w-8 h-8 text-[#39db67]" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-foreground">
              Integrations Hub
            </h1>
            <p className="text-lg text-muted-foreground mt-2">Connect your favorite Web3 games to unlock cross-game rewards.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {mergedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </PageTransition>
  )
}
