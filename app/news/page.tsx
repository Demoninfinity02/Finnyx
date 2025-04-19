import { Metadata } from 'next'
import NewsFeed from '@/components/news/news-feed'
import NewsFilters from '@/components/news/news-filters'
import NewsSearch from '@/components/news/news-search'

export const metadata: Metadata = {
  title: 'Financial News - Finnyx',
  description: 'Latest financial news and market updates',
}

export default function NewsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Financial News
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Stay updated with the latest financial news and market insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <NewsSearch />
          <NewsFilters />
        </div>
        <div className="lg:col-span-3">
          <NewsFeed />
        </div>
      </div>
    </div>
  )
}