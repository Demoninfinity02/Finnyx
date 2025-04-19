"use client"

import { useState } from 'react'
import { Check, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'

const categories = [
  { id: 'stocks', label: 'Stocks' },
  { id: 'crypto', label: 'Cryptocurrency' },
  { id: 'forex', label: 'Forex' },
  { id: 'economy', label: 'Economy' },
  { id: 'markets', label: 'Markets' },
  { id: 'commodities', label: 'Commodities' },
]

const timeframes = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
  { id: 'year', label: 'This Year' },
]

export default function NewsFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('week')

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedTimeframe('week')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mobile Filter Button */}
        <div className="lg:hidden w-full mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedCategories.length > 0 ? `${selectedCategories.length} active` : 'None active'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map(category => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                >
                  {category.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Timeframe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {timeframes.map(time => (
                <DropdownMenuCheckboxItem
                  key={time.id}
                  checked={selectedTimeframe === time.id}
                  onCheckedChange={() => setSelectedTimeframe(time.id)}
                >
                  {time.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <label 
                    htmlFor={`category-${category.id}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-sm font-medium">Timeframe</h3>
            <div className="space-y-2">
              {timeframes.map(time => (
                <div key={time.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`time-${time.id}`} 
                    checked={selectedTimeframe === time.id}
                    onCheckedChange={() => setSelectedTimeframe(time.id)}
                  />
                  <label 
                    htmlFor={`time-${time.id}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {time.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Button className="w-full hidden lg:flex">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}