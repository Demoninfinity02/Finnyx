import { Metadata } from 'next'
import MarketDashboard from '@/components/finance/market-dashboard'
import Watchlist from '@/components/finance/watchlist'
import PortfolioSummary from '@/components/finance/portfolio-summary'

export const metadata: Metadata = {
  title: 'Finance Dashboard - Finnyx',
  description: 'Track markets, manage your watchlist, and monitor your portfolio',
}

export default function FinancePage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Finance Dashboard
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Track market movements, manage your watchlist, and monitor your portfolio
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketDashboard />
        </div>
        <div className="space-y-6">
          <Watchlist />
          <PortfolioSummary />
        </div>
      </div>
    </div>
  )
}