"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock news data - would normally come from an API
const allNewsItems = [
  {
    id: 1,
    title: 'Federal Reserve Signals Potential Rate Cut',
    description: 'The Fed chair indicated that interest rates could be reduced in the coming months as inflation pressures ease.',
    content: 'In a recent policy meeting, Federal Reserve officials discussed the possibility of reducing interest rates later this year if economic data continues to show moderation in inflation. "We're seeing encouraging signs in the inflation data," said the Fed chair during the press conference. Analysts are now predicting at least two rate cuts before year-end, which could stimulate economic growth and boost market sentiment.',
    category: 'Economy',
    date: 'July 12, 2025',
    image: 'https://images.pexels.com/photos/5466781/pexels-photo-5466781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Tech Stocks Surge After Positive Earnings Reports',
    description: 'Major technology companies reported better-than-expected earnings, driving a rally in the tech sector.',
    content: 'Technology stocks experienced significant gains after several major companies in the sector reported quarterly earnings that exceeded analyst expectations. The positive results were driven by strong consumer demand and successful cost-cutting initiatives. The rally helped push major indices to new heights, with the tech-heavy NASDAQ seeing particularly strong performance.',
    category: 'Stocks',
    date: 'July 10, 2025',
    image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Bitcoin Reaches New All-Time High',
    description: 'The leading cryptocurrency has broken its previous record, reaching unprecedented valuation.',
    content: 'Bitcoin has surpassed its previous all-time high, reaching a value of over $80,000. The surge comes amid increased institutional adoption and growing recognition of cryptocurrencies as a legitimate asset class. Analysts point to several factors driving the rally, including favorable regulatory developments and growing inflation concerns that have pushed investors toward alternative stores of value.',
    category: 'Crypto',
    date: 'July 9, 2025',
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 4,
    title: 'Global Supply Chain Improvements Reduce Inflation Pressures',
    description: 'Logistics bottlenecks are easing, helping to reduce price pressures across various sectors.',
    content: 'Global supply chains are showing significant signs of improvement, with shipping costs declining and delivery times shortening. This development is helping to ease inflation pressures that had built up during the post-pandemic recovery. Economists suggest that these improvements could contribute to more moderate price increases in the coming months, potentially giving central banks more flexibility in their monetary policy decisions.',
    category: 'Economy',
    date: 'July 8, 2025',
    image: 'https://images.pexels.com/photos/4481331/pexels-photo-4481331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 5,
    title: 'Renewable Energy Stocks Outperform as Climate Policies Advance',
    description: 'Companies in the clean energy sector are seeing strong performance amid policy support.',
    content: 'Stocks in the renewable energy sector have outperformed the broader market as governments worldwide advance climate policies. Solar, wind, and energy storage companies have seen particular strength following announcements of new subsidies and regulatory support. Analysts suggest that this trend could continue as the global transition to clean energy accelerates, creating long-term growth opportunities in the sector.',
    category: 'Stocks',
    date: 'July 7, 2025',
    image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 6,
    title: 'New Stablecoins Regulations Proposed by Financial Authorities',
    description: 'Regulatory bodies have outlined new frameworks for stablecoin issuers to ensure market stability.',
    content: 'Financial regulators have proposed comprehensive new rules for stablecoin issuers, aimed at ensuring market stability and protecting consumers. The framework includes requirements for reserve assets, regular audits, and operational resilience. Industry participants have generally welcomed the clarity, though some have expressed concerns about compliance costs. The regulations are expected to be finalized later this year after a public comment period.',
    category: 'Crypto',
    date: 'July 6, 2025',
    image: 'https://images.pexels.com/photos/5980743/pexels-photo-5980743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function NewsFeed() {
  const [visibleItems, setVisibleItems] = useState(5)
  
  const loadMore = () => {
    setVisibleItems(prev => prev + 3)
  }
  
  return (
    <div className="space-y-6">
      {allNewsItems.slice(0, visibleItems).map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="md:flex">
            <div className="relative h-60 md:h-auto md:w-1/3">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge>{item.category}</Badge>
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  <Link href={`/news/${item.id}`}>{item.title}</Link>
                </CardTitle>
                <CardDescription>{item.date}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pb-4">
                <p className="text-muted-foreground">{item.description}</p>
                <p className="mt-4 text-muted-foreground line-clamp-2">{item.content}</p>
              </CardContent>
              <CardFooter className="p-0">
                <Link 
                  href={`/news/${item.id}`} 
                  className="font-medium text-primary hover:underline"
                >
                  Read full article
                </Link>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
      
      {visibleItems < allNewsItems.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={loadMore}>
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}