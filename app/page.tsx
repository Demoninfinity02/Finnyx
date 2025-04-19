import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BarChart2, Lightbulb, Shield, TrendingUp, MessageSquare } from 'lucide-react'
import { Newspaper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MarketOverview from '@/components/home/market-overview'
import NewsHighlights from '@/components/home/news-highlights'
import FeatureCard from '@/components/home/feature-card'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Financial Intelligence for the Modern Investor
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Powerful insights, real-time data, and AI-driven recommendations to elevate your financial decisions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="rounded-full">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-xl">
              <Image
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Financial dashboard"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Market overview section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Market Overview</h2>
          <MarketOverview />
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Financial Tools
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Everything you need to make informed investment decisions, track your portfolio, and stay ahead of market trends.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Newspaper}
              title="Latest News"
              description="Stay updated with the latest financial news and market movements."
              href="/news"
            />
            <FeatureCard 
              icon={BarChart2}
              title="Market Data"
              description="Track real-time market data and analyze performance with interactive charts."
              href="/finance"
            />
            <FeatureCard 
              icon={Lightbulb}
              title="Insights"
              description="Get expert insights and analysis to make informed investment decisions."
              href="/insights"
            />
            <FeatureCard 
              icon={MessageSquare}
              title="AI Assistant"
              description="Ask questions and get personalized financial advice from our AI assistant."
              href="/assistant"
            />
          </div>
        </div>
      </section>

      {/* News highlights section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Latest Financial News
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Stay informed with the latest developments in the financial world.
              </p>
            </div>
          </div>
          <NewsHighlights />
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/news" className="inline-flex items-center gap-1">
                View All News <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background -z-10" />
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Join thousands of investors making smarter decisions with Finnyx.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="rounded-full">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}