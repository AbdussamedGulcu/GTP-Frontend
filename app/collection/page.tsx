"use client"

import { Library, Ghost } from "lucide-react"
import { marketplaceOffers } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { useAppContext } from "@/lib/context"
import { PageTransition } from "@/components/page-transition"
import Link from "next/link"

export default function CollectionPage() {
  const { inventory } = useAppContext()
  
  // Filter the offers to only include purchased items
  const myItems = marketplaceOffers.filter(item => inventory.includes(item.id))

  return (
    <PageTransition>
      <main className="content-layer container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-neon-purple/20 flex items-center justify-center glow-purple">
            <Library className="w-8 h-8 text-neon-purple" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold text-foreground">
              My Collection
            </h1>
            <p className="text-lg text-muted-foreground mt-2">Your cross-game inventory and rewards</p>
          </div>
        </div>
        
        {myItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 mt-8 rounded-3xl bg-[#21044d]/50 border border-[#39db67]/20 backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full bg-neon-purple/10 flex items-center justify-center mb-6">
              <Ghost className="w-12 h-12 text-neon-purple opacity-70" />
            </div>
            <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold mb-3">Your Collection is Empty</h2>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              You haven't purchased any items yet. Head over to the Marketplace to discover powerful items across the multiverse.
            </p>
            <Link 
              href="/marketplace"
              className="px-8 py-3 rounded-2xl font-semibold transition-all duration-300
                bg-[#39db67]/15 border-2 border-[#39db67]/50 text-[#39db67]
                hover:bg-[#39db67]/20 hover:border-[#39db67]/80 hover:scale-105
                hover:shadow-[0_0_30px_rgba(57,219,103,0.5)]"
            >
              Browse Marketplace
            </Link>
          </div>
        )}
      </main>
    </PageTransition>
  )
}
