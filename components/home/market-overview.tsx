"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data - would normally come from an API
const marketData = {
  stocks: [
    { name: 'Jan', value: 1500 },
    { name: 'Feb', value: 1600 },
    { name: 'Mar', value: 1550 },
    { name: 'Apr', value: 1700 },
    { name: 'May', value: 1800 },
    { name: 'Jun', value: 1750 },
    { name: 'Jul', value: 1900 },
  ],
  crypto: [
    { name: 'Jan', value: 900 },
    { name: 'Feb', value: 1200 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 1400 },
    { name: 'May', value: 1100 },
    { name: 'Jun', value: 1300 },
    { name: 'Jul', value: 1500 },
  ],
  forex: [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1250 },
    { name: 'Mar', value: 1300 },
    { name: 'Apr', value: 1280 },
    { name: 'May', value: 1350 },
    { name: 'Jun', value: 1400 },
    { name: 'Jul', value: 1450 },
  ]
}

const marketIndices = [
  { name: 'S&P 500', value: '4,892.37', change: '+1.24%', status: 'up' },
  { name: 'NASDAQ', value: '15,628.95', change: '+1.73%', status: 'up' },
  { name: 'DOW', value: '36,245.50', change: '+0.89%', status: 'up' },
  { name: 'Bitcoin', value: '$58,731.20', change: '-2.14%', status: 'down' },
  { name: 'EUR/USD', value: '1.0928', change: '+0.32%', status: 'up' },
  { name: 'Gold', value: '$2,345.60', change: '+0.54%', status: 'up' },
]

export default function MarketOverview() {
  const [activeTab, setActiveTab] = useState('stocks')
  
  // This would be replaced with real market data from an API
  const chartData = marketData[activeTab as keyof typeof marketData]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Market Performance</CardTitle>
            <Tabs defaultValue="stocks" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="forex">Forex</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Market Indices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketIndices.map((index) => (
                <div key={index.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{index.name}</p>
                    <p className="text-sm text-muted-foreground">{index.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${index.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {index.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}