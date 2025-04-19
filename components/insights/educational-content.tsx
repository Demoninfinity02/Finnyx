import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Mock educational content
const educationalContent = [
  {
    id: 1,
    title: 'Understanding Market Cycles',
    description: 'Learn about different market cycles and how to position your investments accordingly.',
    category: 'Investment Strategy',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Diversification: The Key to Reducing Risk',
    description: 'Discover how proper diversification can help protect your portfolio during market volatility.',
    category: 'Risk Management',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Fundamental vs. Technical Analysis',
    description: 'Compare and contrast these two popular methods for analyzing stocks and other assets.',
    category: 'Analysis',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]

export default function EducationalContent() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Educational Resources</h2>
          <p className="text-muted-foreground">Expand your financial knowledge</p>
        </div>
        <Button variant="outline">View All Resources</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalContent.map((item) => (
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
              <CardDescription>{item.readTime}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="secondary" className="w-full" asChild>
                <Link href={`/insights/education/${item.id}`}>Read Article</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}