import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DivideIcon as LucideIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export default function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link 
          href={href}
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}