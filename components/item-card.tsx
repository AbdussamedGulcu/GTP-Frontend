"use client"

import { useState } from "react"
import { Sparkles, Zap, Users, Check } from "lucide-react"
import { useAppContext } from "@/lib/context"
import { rarityColors, marketplaceOffers } from "@/lib/data"

export function ItemCard({ item }: { item: typeof marketplaceOffers[0] }) {
  const { inventory, purchaseItem } = useAppContext()
  const isPurchased = inventory.includes(item.id)
  
  const [isGlowing, setIsGlowing] = useState(false)
  
  const rarityStyle = rarityColors[item.rarity] || rarityColors.Rare
  const IconComponent = item.icon

  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigation if wrapped in Link (not applicable here, but good practice)
    if (isPurchased) return
    
    const success = purchaseItem(item.id, item.price)
    if (success) {
      setIsGlowing(true)
      setTimeout(() => setIsGlowing(false), 1500)
    } else {
      // Optional: shake animation or error handling if not enough funds
      // For now, we just silently fail if not enough funds, or could add an alert
    }
  }

  return (
    <div 
      className={`group rounded-3xl overflow-hidden
        bg-[rgba(57,219,103,0.1)] backdrop-blur-[24px]
        border-2 border-[#39db67]/50
        shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_50px_rgba(57,219,103,0.12)]
        transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isGlowing ? 'shadow-[0_0_60px_#39db67] border-[#39db67] scale-105' : ''}
        ${isPurchased ? 'opacity-80 grayscale-[0.2]' : 'cursor-pointer hover:scale-[1.03] hover:bg-[rgba(57,219,103,0.03)] hover:border-[#39db67]/70 hover:shadow-[0_16px_60px_rgba(0,0,0,0.6),0_0_100px_rgba(57,219,103,0.2),inset_0_0_40px_rgba(57,219,103,0.03)]'}
      `}
    >
      <div className="relative h-56 bg-gradient-to-br from-neon-purple/10 via-transparent to-[#39db67]/10 flex items-center justify-center transition-all duration-[400ms] group-hover:bg-gradient-to-br group-hover:from-neon-purple/05 group-hover:via-transparent group-hover:to-[#39db67]/05">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,219,103,0.1),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_50%_50%,rgba(57,219,103,0.05),transparent_70%)] transition-all duration-[400ms]" />
        
        <div className={`w-28 h-28 rounded-3xl ${rarityStyle.bg} backdrop-blur-sm border ${rarityStyle.border} flex items-center justify-center transition-all duration-500 ${rarityStyle.glow} ${!isPurchased && 'group-hover:scale-110 group-hover:bg-opacity-50'}`}>
          <IconComponent className={`w-14 h-14 ${rarityStyle.text}`} />
        </div>
        
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full ${rarityStyle.bg} border ${rarityStyle.border} ${rarityStyle.glow} transition-all duration-[400ms] ${!isPurchased && 'group-hover:bg-opacity-50'}`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className={`w-3 h-3 ${rarityStyle.text}`} />
            <span className={`text-xs font-semibold ${rarityStyle.text}`}>{item.rarity}</span>
          </div>
        </div>
        
        <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#39db67]/15 border border-[#39db67]/50 transition-all duration-[400ms] ${!isPurchased && 'group-hover:bg-[#39db67]/08'}`}>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#39db67]" />
            <span className="text-xs font-semibold text-[#39db67]">{item.bonus}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-foreground text-xl text-balance leading-tight">{item.name}</h3>
          <p className="text-sm text-neon-teal mt-1.5">{item.game}</p>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{item.owners.toLocaleString()} owners</span>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-[#39db67]/30">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#39db67]">{item.price}</span>
              <span className="text-sm text-muted-foreground font-medium">GTP</span>
            </div>
          </div>
          
          {isPurchased ? (
            <button 
              disabled
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                bg-[#39db67]/20 border-2 border-[#39db67] text-[#39db67] flex items-center gap-2
                shadow-[0_0_20px_rgba(57,219,103,0.3)] opacity-80 cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              Purchased
            </button>
          ) : (
            <button 
              onClick={handlePurchase}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                bg-[#39db67]/15 border-2 border-[#39db67]/50 text-[#39db67]
                group-hover:bg-[#39db67]/10 group-hover:border-[#39db67]/60 group-hover:scale-105
                group-hover:shadow-[0_0_20px_rgba(57,219,103,0.3)]
                hover:!bg-[#39db67]/20 hover:!border-[#39db67]/80 hover:!scale-110
                hover:!shadow-[0_0_30px_rgba(57,219,103,0.5)]
                active:scale-95 cursor-pointer"
            >
              Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
