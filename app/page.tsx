import { ConnectedGames } from "@/components/connected-games"
import { Marketplace } from "@/components/marketplace"
import { PageTransition } from "@/components/page-transition"

export default function Dashboard() {
  return (
    <PageTransition>
      {/* Main content with top padding for fixed header */}
      <main className="content-layer container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 space-y-16">
        <div id="connected-games" className="scroll-mt-28">
          <ConnectedGames />
        </div>
        <div id="marketplace" className="scroll-mt-28">
          <Marketplace />
        </div>
        {/* Extra spacing to ensure scroll */}
        <div className="h-24" />
      </main>
    </PageTransition>
  )
}
