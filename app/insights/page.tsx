import { Metadata } from 'next'
import MarketAnalysis from '@/components/insights/market-analysis'
import EducationalContent from '@/components/insights/educational-content'
import FinancialCalculators from '@/components/insights/financial-calculators'

export const metadata: Metadata = {
  title: 'Financial Insights - Finnyx',
  description: 'Market analysis, educational resources, and financial tools',
}

export default function InsightsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Financial Insights
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Access market analysis, educational content, and financial tools
        </p>
      </div>
      
      <div className="space-y-10">
        <MarketAnalysis />
        <EducationalContent />
        <FinancialCalculators />
      </div>
    </div>
  )
}