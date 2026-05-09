"use client"

import { useParams } from "next/navigation"
import { allAvailableGames } from "@/lib/data"
import { gameAchievements } from "@/lib/achievements"
import { Trophy, ArrowLeft, Target, Lock } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"

export default function GameAchievementsPage() {
  const params = useParams()
  const gameId = Number(params.id)
  
  const game = allAvailableGames.find(g => g.id === gameId)
  const achievements = gameAchievements.filter(a => a.gameId === gameId)
  
  if (!game) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-12 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-neon-purple font-[family-name:var(--font-orbitron)]">Oyun bulunamadı!</h1>
      </div>
    )
  }

  return (
    <PageTransition>
      <main className="content-layer container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 min-h-screen">
        <div className="mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-purple transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-neon-purple/20 flex items-center justify-center shadow-[0_0_20px_rgba(139,42,168,0.3)]">
              <Trophy className="w-8 h-8 text-neon-purple" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-foreground">
                {game.name} Başarımları
              </h1>
              <p className="text-lg text-muted-foreground mt-2">Bu oyunda kazandığın ve kazanabileceğin başarımlar.</p>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-1">Tamamlanma Oranı</span>
              <span className="text-xl font-bold text-foreground">
                {achievements.length > 0 
                  ? Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-purple to-neon-teal rounded-full"
                style={{ 
                  width: `${achievements.length > 0 ? (achievements.filter(a => a.unlocked).length / achievements.length) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground">Henüz başarım eklenmemiş</h3>
            <p className="text-muted-foreground mt-2">Arkadaşlarınız lib/achievements.ts dosyasına başarımları ekleyebilir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-6 rounded-2xl border ${
                  achievement.unlocked 
                    ? 'bg-neon-purple/10 border-neon-purple/30 shadow-[0_0_15px_rgba(139,42,168,0.15)]' 
                    : 'bg-white/5 border-white/10 opacity-70'
                } flex gap-4 transition-all hover:scale-[1.02]`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  achievement.unlocked ? 'bg-neon-purple/20 text-neon-purple' : 'bg-white/10 text-muted-foreground'
                }`}>
                  {achievement.unlocked ? <Trophy className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {achievement.description}
                  </p>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-foreground">
                    {achievement.points} Puan
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  )
}
