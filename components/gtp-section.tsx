"use client"

// =============================================================
// GTPSection — Dashboard'a eklenecek proof demo bölümü
// Vedat bunu components/ klasörüne koyar, page.tsx'e import eder
// =============================================================

import { useState, useEffect } from "react"
import { Wallet, Trophy, Zap, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { generateProofFlow } from "@/lib/gtp"
import { connectWallet, getConnectedWallet } from "@/lib/gtp"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface BackendProof {
  id: string
  gameId: string
  achievementId: string
  playerWallet: string
  solanaStatus: string
  protocol: string
}

const RARITY_COLORS: Record<string, string> = {
  Legendary: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  Epic: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  Rare: "text-blue-400  border-blue-400/40  bg-blue-400/10",
  Common: "text-gray-400  border-gray-400/40  bg-gray-400/10",
}

export function GTPSection() {
  const [wallet, setWallet] = useState<string | null>(null)
  const [proofs, setProofs] = useState<BackendProof[]>([])
  const [earning, setEarning] = useState(false)
  const [loadingProofs, setLoading] = useState(false)
  const [lastMsg, setLastMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null)

  // Sayfa açılınca bağlı cüzdanı kontrol et
  useEffect(() => {
    const w = getConnectedWallet()
    if (w) {
      setWallet(w)
      fetchProofs(w)
    }
  }, [])

  // Phantom cüzdan bağla
  const handleConnect = async () => {
    try {
      const address = await connectWallet()
      setWallet(address)
      await fetchProofs(address)
    } catch (err: any) {
      setLastMsg({ type: "err", text: err.message })
    }
  }

  // Backend'den proof'ları çek
  const fetchProofs = async (w: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/get-player-proofs/${w}`)
      const data = await res.json()
      setProofs(data.data || [])
    } catch {
      setProofs([])
    } finally {
      setLoading(false)
    }
  }

  // Başarım kazan → proof oluştur → backend'e gönder
  const handleEarn = async (gameId: string, achievementKey: string) => {
    if (!wallet) return
    setEarning(true)
    setLastMsg(null)
    try {
      const result = await generateProofFlow(wallet, gameId, achievementKey)
      setLastMsg({
        type: "ok",
        text: `✅ ${result.proof.achievement.title} kazanıldı! ${result.backendId ? "Firebase'e kaydedildi." : "Lokal kaydedildi."}`,
      })
      await fetchProofs(wallet)
    } catch (err: any) {
      setLastMsg({ type: "err", text: err.message })
    } finally {
      setEarning(false)
    }
  }

  return (
    <section className="space-y-8">
      {/* Başlık */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
          <Trophy className="w-7 h-7 text-purple-400" />
        </div>
        <div>
          <h2 className="font-bold text-2xl text-white">GTP Proof Inventory</h2>
          <p className="text-sm text-gray-400 mt-1">Your cross-game achievement proofs — powered by GTP Protocol</p>
        </div>
      </div>

      {/* Cüzdan Bağlama */}
      {!wallet ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center space-y-4">
          <Wallet className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-300">Connect your Phantom wallet to view your proofs</p>
          <button
            onClick={handleConnect}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors"
          >
            Connect Phantom Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cüzdan Bilgisi */}
          <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-mono">
                {wallet.slice(0, 6)}...{wallet.slice(-4)}
              </span>
            </div>
            <span className="text-xs text-green-400/70">Solana Devnet</span>
          </div>

          {/* Demo Başarım Butonları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleEarn("cyber-arena", "legendary_sword")}
              disabled={earning}
              className="flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 px-5 py-4 text-left transition-colors disabled:opacity-50"
            >
              <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
              <div>
                <p className="font-semibold text-white text-sm">Cyber Arena</p>
                <p className="text-xs text-yellow-300/70">Earn: Legendary Sword Holder</p>
              </div>
            </button>

            <button
              onClick={() => handleEarn("space-kart", "galaxy_pilot")}
              disabled={earning}
              className="flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 px-5 py-4 text-left transition-colors disabled:opacity-50"
            >
              <Zap className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-white text-sm">Space Kart</p>
                <p className="text-xs text-blue-300/70">Earn: Galaxy Pilot</p>
              </div>
            </button>
          </div>

          {earning && (
            <p className="text-center text-sm text-gray-400 animate-pulse">
              ⏳ Creating proof and syncing to Firebase...
            </p>
          )}

          {lastMsg && (
            <div className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${lastMsg.type === "ok"
                ? "bg-green-500/10 border border-green-500/30 text-green-300"
                : "bg-red-500/10 border border-red-500/30 text-red-300"
              }`}>
              {lastMsg.type === "ok"
                ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
              {lastMsg.text}
            </div>
          )}

          {/* Proof Listesi */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Your Proofs {loadingProofs ? "(loading...)" : `(${proofs.length})`}
            </h3>

            {proofs.length === 0 && !loadingProofs ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400 text-sm">
                No proofs yet. Earn an achievement above to get started!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-white text-sm leading-tight">
                        {proof.achievementId.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${proof.solanaStatus === "pending"
                          ? "text-orange-400 border-orange-400/40 bg-orange-400/10"
                          : "text-green-400 border-green-400/40 bg-green-400/10"
                        }`}>
                        {proof.solanaStatus === "pending" ? "⏳ Pending" : "✅ On-Chain"}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                      <p>Game: <span className="text-gray-300">{proof.gameId}</span></p>
                      <p>Protocol: <span className="text-gray-300">{proof.protocol}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
