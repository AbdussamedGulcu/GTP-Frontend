"use client"

import Link from "next/link"
import { ShoppingBag, Plus } from "lucide-react"
import { marketplaceOffers } from "@/lib/data"
import { ItemCard } from "./item-card"
import { motion } from "framer-motion"

export function Marketplace() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-neon-green/20 flex items-center justify-center glow-green">
          <ShoppingBag className="w-7 h-7 text-neon-green" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-foreground">
            Marketplace
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Trade items across all your connected games</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {marketplaceOffers.slice(0, 4).map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
        
        {/* Navigation Card */}
        <Link href="/marketplace">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group rounded-3xl overflow-hidden cursor-pointer
              bg-[rgba(57,219,103,0.05)] backdrop-blur-[24px]
              border-2 border-dashed border-[#39db67]/40
              shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_50px_rgba(57,219,103,0.08)]
              hover:bg-[rgba(57,219,103,0.1)] hover:border-[#39db67]/70 hover:border-solid
              hover:shadow-[0_16px_60px_rgba(0,0,0,0.6),0_0_100px_rgba(57,219,103,0.2),inset_0_0_40px_rgba(57,219,103,0.05)]
              transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center h-full min-h-[420px] space-y-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-[#39db67]/15 flex items-center justify-center border border-[#39db67]/30 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(57,219,103,0.4)] transition-all duration-500">
              <Plus className="w-10 h-10 text-[#39db67]" />
            </div>
            <span className="font-semibold text-foreground text-lg text-balance text-center px-4">View All Offers</span>
          </motion.div>
        </Link>
      </div>
    </section>
  )
}
