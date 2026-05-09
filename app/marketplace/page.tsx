"use client"

import { ShoppingBag } from "lucide-react"
import { marketplaceOffers } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { PageTransition } from "@/components/page-transition"

export default function MarketplacePage() {
  return (
    <PageTransition>
      <main className="content-layer container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-neon-green/20 flex items-center justify-center glow-green">
            <ShoppingBag className="w-8 h-8 text-neon-green" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-foreground">
              Marketplace Hub
            </h1>
            <p className="text-lg text-muted-foreground mt-2">Discover, trade, and collect across the multiverse</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {marketplaceOffers.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </PageTransition>
  )
}
