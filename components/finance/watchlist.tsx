"use client"

import { useState } from 'react'
import { Plus, ArrowUpCircle, ArrowDownCircle, Star, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data - would normally come from an API
const initialWatchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 162.80, change: 1.46, status: 'up' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 328.65, change: 0.72, status: 'up' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 124.75, change: -0.58, status: 'down' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 159.82, change: 2.15, status: 'up' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 218.63, change: 4.27, status: 'up' },
]

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const [newSymbol, setNewSymbol] = useState('')
  
  const addToWatchlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSymbol) return
    
    // In a real app, we would fetch the stock data from an API
    const mockNewStock = {
      symbol: newSymbol.toUpperCase(),
      name: `${newSymbol.toUpperCase()} Corp.`,
      price: Math.floor(Math.random() * 500) + 50,
      change: (Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
      status: Math.random() > 0.5 ? 'up' : 'down',
    }
    
    setWatchlist([...watchlist, mockNewStock])
    setNewSymbol('')
  }
  
  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol))
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Watchlist</span>
          <Button variant="outline" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>Track your favorite stocks</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={addToWatchlist} className="flex space-x-2 mb-4">
          <Input
            placeholder="Add symbol (e.g., AAPL)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="space-y-3">
          {watchlist.map((stock) => (
            <div 
              key={stock.symbol} 
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-medium">${stock.price}</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    stock.status === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stock.status === 'up' ? 
                      <ArrowUpCircle className="h-3 w-3" /> : 
                      <ArrowDownCircle className="h-3 w-3" />
                    }
                    {stock.change}%
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add to portfolio</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => removeFromWatchlist(stock.symbol)}>
                      Remove from watchlist
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}