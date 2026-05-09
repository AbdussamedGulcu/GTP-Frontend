"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Game, allAvailableGames } from "./data"

interface AppContextType {
  balance: number
  inventory: number[]
  connectedGames: Game[]
  purchaseItem: (id: number, price: number) => boolean
  connectGame: (id: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(2450)
  const [inventory, setInventory] = useState<number[]>([])
  const [connectedGames, setConnectedGames] = useState<Game[]>([])

  // Load state from localStorage on mount (optional but good for dev experience)
  useEffect(() => {
    const savedBalance = localStorage.getItem("gtp_balance")
    const savedInventory = localStorage.getItem("gtp_inventory")
    const savedGames = localStorage.getItem("gtp_games")
    
    if (savedBalance) setBalance(Number(savedBalance))
    if (savedInventory) setInventory(JSON.parse(savedInventory))
    
    // Force update the games list from data.ts instead of using cached localstorage games
    // to ensure A Oyunu and B Oyunu show up properly
    setConnectedGames(allAvailableGames)
  }, [])

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem("gtp_balance", balance.toString())
    localStorage.setItem("gtp_inventory", JSON.stringify(inventory))
    if (connectedGames.length > 0) {
      localStorage.setItem("gtp_games", JSON.stringify(connectedGames))
    }
  }, [balance, inventory, connectedGames])

  const purchaseItem = (id: number, price: number) => {
    if (balance >= price && !inventory.includes(id)) {
      setBalance((prev) => prev - price)
      setInventory((prev) => [...prev, id])
      return true
    }
    return false
  }

  const connectGame = (id: number) => {
    setConnectedGames(prev => {
      const exists = prev.some(g => g.id === id)
      
      if (exists) {
        return prev.map(game => {
          if (game.id === id) {
            return {
              ...game,
              connected: true,
              hoursPlayed: 0,
              achievements: 0,
              level: 1
            }
          }
          return game
        })
      } else {
        const gameToAdd = allAvailableGames.find(g => g.id === id)
        if (gameToAdd) {
          return [
            ...prev,
            {
              ...gameToAdd,
              connected: true,
              hoursPlayed: 0,
              achievements: 0,
              level: 1
            }
          ]
        }
        return prev
      }
    })
  }

  return (
    <AppContext.Provider value={{ balance, inventory, connectedGames, purchaseItem, connectGame }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
