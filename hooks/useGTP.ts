// hooks/useGTP.ts
// Vedat bu hook'u herhangi bir component'te kullanabilir

"use client"

import { useState, useCallback } from "react"
import { generateProofFlow, ProofFlowResult } from "@/lib/gtp/proofFlow"
import { getStoredProofs } from "@/lib/gtp/verify"
import { GTPProof } from "@/lib/gtp/types"

export function useGTP(walletAddress: string | null) {
  const [loading, setLoading] = useState(false)
  const [lastResult, setLastResult] = useState<ProofFlowResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Başarım kazan — proof oluştur + backend'e gönder
  const earnAchievement = useCallback(async (
    gameId: string = "cyber-arena",
    achievementKey: string = "legendary_sword"
  ) => {
    if (!walletAddress) {
      setError("Cüzdan bağlı değil")
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const result = await generateProofFlow(walletAddress, gameId, achievementKey)
      setLastResult(result)
      return result
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu")
      return null
    } finally {
      setLoading(false)
    }
  }, [walletAddress])

  // Local storage'daki proof'ları getir
  const getLocalProofs = useCallback((): GTPProof[] => {
    if (!walletAddress) return []
    return getStoredProofs(walletAddress)
  }, [walletAddress])

  return {
    earnAchievement,
    getLocalProofs,
    loading,
    lastResult,
    error,
  }
}
