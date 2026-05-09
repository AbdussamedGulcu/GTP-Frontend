"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, HeartCrack, RefreshCcw, ArrowLeft, Trophy } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"

type ItemType = 'apple' | 'carrot' | 'blueberry' | 'strawberry' | 'acorn'
type FallingItem = { id: number; type: ItemType; x: number; y: number; speed: number; rotation: number }
type Particle = { id: number; x: number; y: number; color: string; vy: number; vx: number; life: number }

const BASKET_WIDTH_PCT = 15 // percentage width
const BASKET_CATCH_Y = 85 // catch zone percentage

const ITEM_DEFS: Record<ItemType, { icon: string; color: string; points: number }> = {
  apple: { icon: '🍎', color: '#ef4444', points: 1 },
  carrot: { icon: '🥕', color: '#f97316', points: 1 },
  blueberry: { icon: '🫐', color: '#2563eb', points: 1 },
  strawberry: { icon: '🍓', color: '#f43f5e', points: 2 },
  acorn: { icon: '✨', color: '#fbbf24', points: 10 },
}

export default function HarvestRush() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [basketX, setBasketX] = useState(50)
  
  const [items, setItems] = useState<FallingItem[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [notifications, setNotifications] = useState<{id: number, text: string}[]>([])
  
  // Achievement trackers
  const [hasLostLife, setHasLostLife] = useState(false)
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const lastItemTimeRef = useRef<number>(0)
  const counterRef = useRef(0)
  const stateRef = useRef({ score, lives, items, particles, basketX, hasLostLife })

  // Keep stateRef synced
  useEffect(() => {
    stateRef.current = { score, lives, items, particles, basketX, hasLostLife }
  }, [score, lives, items, particles, basketX, hasLostLife])

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      if (e.key === 'ArrowLeft') {
        setBasketX(prev => Math.max(5, prev - 5))
      } else if (e.key === 'ArrowRight') {
        setBasketX(prev => Math.min(95, prev + 5))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState])

  // Mouse/Touch handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setBasketX(Math.max(5, Math.min(95, x)))
  }

  // Achievement Unlocker
  const unlockAchievement = useCallback((id: string, name: string) => {
    const saved = localStorage.getItem('gtp_achievements_2')
    const unlockedIds = saved ? JSON.parse(saved) as string[] : []
    
    if (!unlockedIds.includes(id)) {
      unlockedIds.push(id)
      localStorage.setItem('gtp_achievements_2', JSON.stringify(unlockedIds))
      
      // Show notification
      const notifId = Date.now()
      setNotifications(prev => [...prev, { id: notifId, text: `Başarım Açıldı: ${name}!` }])
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notifId))
      }, 3000)
    }
  }, [])

  // Game Loop
  const updateGame = useCallback((time: number) => {
    if (stateRef.current.lives <= 0) {
      setGameState('gameover')
      return
    }

    const current = stateRef.current
    let nextItems = [...current.items]
    let nextParticles = [...current.particles]
    let nextScore = current.score
    let nextLives = current.lives
    let nextHasLostLife = current.hasLostLife

    // Spawn new item
    if (time - lastItemTimeRef.current > Math.max(600, 1500 - nextScore * 10)) {
      const rand = Math.random() * 100
      let type: ItemType = 'apple'
      if (rand > 95) type = 'acorn'
      else if (rand > 80) type = 'strawberry'
      else if (rand > 60) type = 'blueberry'
      else if (rand > 30) type = 'carrot'

      nextItems.push({
        id: counterRef.current++,
        type,
        x: 10 + Math.random() * 80,
        y: -10,
        speed: 0.3 + Math.random() * 0.3 + (nextScore * 0.005),
        rotation: Math.random() * 360
      })
      lastItemTimeRef.current = time
    }

    // Update items
    nextItems = nextItems.filter(item => {
      item.y += item.speed
      item.rotation += item.speed

      // Catch logic
      if (item.y >= BASKET_CATCH_Y - 5 && item.y <= BASKET_CATCH_Y + 5) {
        const dist = Math.abs(item.x - current.basketX)
        if (dist < BASKET_WIDTH_PCT / 2 + 5) {
          // CAUGHT
          nextScore += ITEM_DEFS[item.type].points
          
          // Spawn particles
          for (let i = 0; i < 5; i++) {
            nextParticles.push({
              id: counterRef.current++,
              x: item.x,
              y: item.y,
              color: ITEM_DEFS[item.type].color,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 1) * 2,
              life: 1
            })
          }

          // Check achievements
          if (nextScore === ITEM_DEFS[item.type].points) unlockAchievement('hr-1', 'İlk Hasat')
          if (item.type === 'acorn') unlockAchievement('hr-2', 'Altın Dokunuş')
          if (nextScore >= 50) unlockAchievement('hr-3', 'Usta Çiftçi')
          if (nextScore >= 20 && !nextHasLostLife) unlockAchievement('hr-4', 'Kusursuz Tarım')

          return false // remove item
        }
      }

      // Miss logic
      if (item.y > 110) {
        if (item.type !== 'acorn') {
          nextLives -= 1
          nextHasLostLife = true
        }
        return false // remove item
      }
      return true
    })

    // Update particles
    nextParticles = nextParticles.filter(p => {
      p.x += p.vx
      p.y += p.vy
      p.life -= 0.05
      return p.life > 0
    })

    setItems(nextItems)
    setParticles(nextParticles)
    setScore(nextScore)
    setLives(nextLives)
    setHasLostLife(nextHasLostLife)

    requestRef.current = requestAnimationFrame(updateGame)
  }, [unlockAchievement])

  useEffect(() => {
    if (gameState === 'playing') {
      lastItemTimeRef.current = performance.now()
      requestRef.current = requestAnimationFrame(updateGame)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [gameState, updateGame])

  const startGame = () => {
    setScore(0)
    setLives(3)
    setItems([])
    setParticles([])
    setBasketX(50)
    setHasLostLife(false)
    setGameState('playing')
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-gradient-to-b from-sky-200 via-pink-100 to-green-200 overflow-hidden relative select-none">
        
        {/* Background Elements */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-green-400 to-green-300 rounded-t-[100%_20px] shadow-[0_-10px_40px_rgba(74,222,128,0.2)]" />
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/60 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-24 bg-white/50 rounded-full blur-xl" />
        
        {/* Header */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <Link href="/games" className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-700 hover:bg-white/50 hover:scale-105 transition-all">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          
          <div className="flex gap-6 items-center">
            {/* Lives */}
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white/80">
              <span className="font-bold text-slate-700 font-[family-name:var(--font-orbitron)] tracking-wide">CAN:</span>
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    {i < lives ? <Heart className="w-7 h-7 text-red-500 fill-red-500 drop-shadow-sm" /> : <HeartCrack className="w-7 h-7 text-red-500/30" />}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Score */}
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white/80">
              <span className="font-bold text-slate-700 font-[family-name:var(--font-orbitron)] tracking-wide">SKOR:</span>
              <span className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-amber-500 drop-shadow-sm">
                {score}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="absolute top-24 right-6 z-50 flex flex-col gap-2">
          <AnimatePresence>
            {notifications.map(n => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-amber-400/90 backdrop-blur-sm text-slate-900 px-4 py-3 rounded-2xl font-medium shadow-lg flex items-center gap-3 border border-amber-300"
              >
                <Trophy className="w-5 h-5 text-slate-900" />
                {n.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="absolute inset-0 z-20 touch-none"
          onPointerMove={handlePointerMove}
        >
          {/* Falling Items */}
          {items.map(item => (
            <div
              key={item.id}
              className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `rotate(${item.rotation}deg)`
              }}
            >
              {ITEM_DEFS[item.type].icon}
            </div>
          ))}

          {/* Particles */}
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: p.color,
                opacity: p.life,
                transform: `scale(${p.life})`
              }}
            />
          ))}

          {/* Basket */}
          <div
            className="absolute bottom-[10%] transform -translate-x-1/2 pointer-events-none transition-transform duration-75"
            style={{ 
              left: `${basketX}%`,
              width: `${BASKET_WIDTH_PCT}vw`,
              maxWidth: '120px'
            }}
          >
            {/* Basket graphics */}
            <div className="w-full aspect-[4/3] relative">
              {/* Back lip */}
              <div className="absolute top-0 w-full h-1/4 bg-[#a67c52] rounded-[50%]" />
              {/* Inside lining */}
              <div className="absolute top-[5%] left-[5%] w-[90%] h-[20%] bg-red-100 rounded-[50%] overflow-hidden flex">
                <div className="w-1/4 h-full bg-red-400 -skew-x-12" />
                <div className="w-1/4 h-full bg-red-400 -skew-x-12 ml-[25%]" />
              </div>
              {/* Front body */}
              <div className="absolute top-[10%] w-full h-[90%] bg-[#c19a6b] rounded-b-[40%] rounded-t-[10%] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] overflow-hidden">
                {/* Wicker texture lines */}
                <div className="w-full h-full flex flex-col justify-between opacity-30 py-2">
                  <div className="w-full h-1 bg-[#8b5a2b]" />
                  <div className="w-full h-1 bg-[#8b5a2b]" />
                  <div className="w-full h-1 bg-[#8b5a2b]" />
                </div>
                {/* Face */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                  <div className="w-3 h-4 bg-slate-800 rounded-full" />
                  <div className="w-3 h-4 bg-slate-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start / Game Over Overlays */}
        <AnimatePresence>
          {gameState !== 'playing' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-white"
              >
                {gameState === 'start' ? (
                  <>
                    <h1 className="text-4xl font-[family-name:var(--font-orbitron)] font-bold text-amber-500 mb-2 drop-shadow-sm">Harvest Rush</h1>
                    <p className="text-slate-600 mb-8">Fareyi veya Yön Tuşlarını kullanarak sepeti hareket ettirin. Düşen taze meyveleri toplayın, canınızı koruyun!</p>
                    <button 
                      onClick={startGame}
                      className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-lg transition-all shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                    >
                      Oyuna Başla
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Oyun Bitti!</h2>
                    <p className="text-slate-600 mb-6">Toplanan Mahsul:</p>
                    <div className="text-6xl font-[family-name:var(--font-orbitron)] font-bold text-amber-500 mb-8">
                      {score}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={startGame}
                        className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-lg transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCcw className="w-5 h-5" />
                        Tekrar Oyna
                      </button>
                      <Link href="/games/2">
                        <button className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all flex items-center justify-center gap-2">
                          <Trophy className="w-5 h-5" />
                          Başarımlara Git
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </PageTransition>
  )
}
