"use client"

import { Gamepad2, Plus, Trophy, Zap, Star, Target, Flame, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAppContext } from "@/lib/context"
import { Game } from "@/lib/data"
import { useState } from "react"
import { motion } from "framer-motion"

export function ConnectedGames() {
  const { connectedGames } = useAppContext()

  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-neon-purple/20 flex items-center justify-center glow-purple">
          <Gamepad2 className="w-7 h-7 text-neon-purple" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-foreground">
            Connected Games
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Sync your achievements across platforms</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {connectedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        
        {/* Placeholder Card */}
        <Link href="/games">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group rounded-3xl p-8 min-h-[320px] flex flex-col items-center justify-center gap-5 cursor-pointer
              bg-[rgba(57,219,103,0.06)] backdrop-blur-[24px] 
              border-2 border-dashed border-[#39db67]/50
              shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(57,219,103,0.1)]
              hover:bg-[rgba(57,219,103,0.02)] hover:border-[#39db67]/80
              hover:shadow-[0_12px_50px_rgba(0,0,0,0.6),0_0_80px_rgba(57,219,103,0.25)]
              transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] h-full"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#39db67]/15 flex items-center justify-center group-hover:bg-[#39db67]/10 group-hover:scale-110 transition-all duration-300">
              <Plus className="w-10 h-10 text-[#39db67]" />
            </div>
            <div className="text-center">
              <span className="text-lg text-muted-foreground group-hover:text-[#39db67] transition-colors font-medium block">
                Link New Game
              </span>
              <span className="text-xs text-muted-foreground/60 mt-2 block">
                Connect to earn rewards
              </span>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  )
}

export function GameCard({ game }: { game: Game }) {
  const { connectGame } = useAppContext()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      connectGame(game.id)
      setIsConnecting(false)
    }, 1500)
  }

  return (
    <div 
      className={`group rounded-3xl p-8 min-h-[320px] flex flex-col cursor-pointer
        bg-[rgba(57,219,103,0.08)] backdrop-blur-[24px]
        border-2 border-[#39db67]/50
        shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(57,219,103,0.1)]
        hover:scale-[1.03] hover:bg-[rgba(57,219,103,0.02)] hover:border-[#39db67]/80
        hover:shadow-[0_12px_50px_rgba(0,0,0,0.6),0_0_80px_rgba(57,219,103,0.25),inset_0_0_30px_rgba(57,219,103,0.05)]
        transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${game.connected ? '' : 'opacity-70'}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#39db67]/15 flex items-center justify-center group-hover:bg-[#39db67]/08 group-hover:scale-110 transition-all duration-300">
          <Gamepad2 className="w-10 h-10 text-[#39db67]" />
        </div>
        {game.connected && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#39db67]/15 border border-[#39db67]/50 transition-all duration-500 animate-in fade-in zoom-in">
            <Zap className="w-4 h-4 text-[#39db67] animate-pulse" />
            <span className="text-sm text-[#39db67] font-semibold">Live</span>
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-foreground text-xl mb-3 text-balance">{game.name}</h3>
      
      {game.connected ? (
        <div className="flex flex-col gap-4 mt-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-[#39db67]/10 rounded-xl px-3 py-2 group-hover:bg-[#39db67]/05 transition-colors duration-300">
              <Trophy className="w-4 h-4 text-[#39db67]" />
              <span className="text-sm text-foreground font-medium">{game.achievements}</span>
            </div>
            <div className="flex items-center gap-2 bg-neon-purple/10 rounded-xl px-3 py-2 group-hover:bg-neon-purple/05 transition-colors duration-300">
              <Star className="w-4 h-4 text-neon-purple" />
              <span className="text-sm text-foreground font-medium">Lv.{game.level}</span>
            </div>
          </div>
          
          {/* Hours played */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm">{game.hoursPlayed} hours played</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-[#39db67]/10 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-[#39db67] to-neon-teal rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, Math.min((game.achievements / 30) * 100, 100))}%` }}
            />
          </div>
          
          <Link 
            href={`/games/${game.id}`} 
            className="w-full py-2.5 rounded-xl bg-neon-purple/15 border border-neon-purple/50 text-neon-purple text-sm font-medium hover:bg-neon-purple/25 hover:border-neon-purple/80 hover:shadow-[0_0_15px_rgba(139,42,168,0.3)] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            <Target className="w-4 h-4" />
            Başarımları Gör
          </Link>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full py-3 rounded-xl bg-[#39db67]/15 border-2 border-[#39db67]/50 text-[#39db67] font-medium hover:bg-[#39db67]/20 hover:border-[#39db67]/80 hover:shadow-[0_0_20px_rgba(57,219,103,0.3)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Account"
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
