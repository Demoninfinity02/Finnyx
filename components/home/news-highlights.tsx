"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock news data - would normally come from an API
const newsItems = [
  {
    id: 1,
    title: 'Federal Reserve Signals Potential Rate Cut',
    description: 'The Fed chair indicated that interest rates could be reduced in the coming months as inflation pressures ease.',
    category: 'Economy',
    date: 'July 12, 2025',
    image: 'https://images.pexels.com/photos/5466781/pexels-photo-5466781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Tech Stocks Surge After Positive Earnings Reports',
    description: 'Major technology companies reported better-than-expected earnings, driving a rally in the tech sector.',
    category: 'Stocks',
    date: 'July 10, 2025',
    image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Bitcoin Reaches New All-Time High',
    description: 'The leading cryptocurrency has broken its previous record, reaching unprecedented valuation.',
    category: 'Crypto',
    date: 'July 9, 2025',
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
]

export default function NewsHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((item) => (
        <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2">
              <Badge>{item.category}</Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </CardTitle>
            <CardDescription>{item.date}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link 
              href={`/news/${item.id}`} 
              className="text-sm font-medium text-primary hover:underline"
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}