"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Wallet } from "lucide-react"
import { useAppContext } from "@/lib/context"
import { motion } from "framer-motion"

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/games", label: "Connected Games" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/collection", label: "My Collection" },
  { href: "/game-a", label: "A Oyunu" },
  { href: "/game-b", label: "B Oyunu" },
]

export function Header() {
  const { balance } = useAppContext()
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#21044d]/80 backdrop-blur-md border-b border-[#39db67]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="font-[family-name:var(--font-orbitron)] text-3xl font-bold tracking-wider">
            <span className="text-neon-purple text-glow-purple transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(139,42,168,0.8)]">G</span>
            <span className="text-neon-green text-glow-green transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(46,204,64,0.8)]">T</span>
            <span className="text-neon-teal text-glow-teal transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(10,158,184,0.8)]">P</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-2 flex-1 mx-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-6 py-2 rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-[#39db67]/10 border border-[#39db67]/30 shadow-[0_0_15px_rgba(57,219,103,0.3)]"
                    transition={{ type: "spring", bounce: 0.25, stiffness: 130, damping: 15 }}
                  />
                )}
                <span className={`relative z-10 font-[family-name:var(--font-orbitron)] text-sm font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-[#39db67] drop-shadow-[0_0_8px_rgba(57,219,103,0.8)]' : 'text-muted-foreground hover:text-[#39db67]/70'}`}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Wallet Section */}
        <div className="flex items-center gap-3">
          <button className="glass glow-green rounded-2xl px-5 py-3 flex items-center gap-4 hover:bg-neon-green/5 hover:border-neon-green/60 hover:scale-105 transition-all duration-300 group">
            <Wallet className="w-6 h-6 text-neon-green group-hover:text-neon-purple transition-colors duration-300" />
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Balance</span>
              <span className="font-semibold text-foreground text-lg">
                {balance.toLocaleString()} <span className="text-neon-green text-sm font-bold">GTP</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
