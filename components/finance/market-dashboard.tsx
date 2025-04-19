"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

// Mock data - would normally come from an API
const marketData = {
  '1D': [
    { time: '9:30', value: 158.0 },
    { time: '10:00', value: 158.5 },
    { time: '10:30', value: 157.8 },
    { time: '11:00', value: 158.3 },
    { time: '11:30', value: 159.2 },
    { time: '12:00', value: 159.5 },
    { time: '12:30', value: 160.1 },
    { time: '13:00', value: 159.8 },
    { time: '13:30', value: 160.5 },
    { time: '14:00', value: 161.2 },
    { time: '14:30', value: 160.8 },
    { time: '15:00', value: 161.5 },
    { time: '15:30', value: 162.3 },
    { time: '16:00', value: 162.8 },
  ],
  '1W': [
    { time: 'Mon', value: 158.0 },
    { time: 'Tue', value: 159.5 },
    { time: 'Wed', value: 160.8 },
    { time: 'Thu', value: 158.9 },
    { time: 'Fri', value: 162.8 },
  ],
  '1M': [
    { time: 'Week 1', value: 150.2 },
    { time: 'Week 2', value: 155.4 },
    { time: 'Week 3', value: 159.7 },
    { time: 'Week 4', value: 162.8 },
  ],
  '3M': [
    { time: 'Jan', value: 145.5 },
    { time: 'Feb', value: 152.8 },
    { time: 'Mar', value: 162.8 },
  ],
  '1Y': [
    { time: 'Q1', value: 132.6 },
    { time: 'Q2', value: 145.7 },
    { time: 'Q3', value: 155.3 },
    { time: 'Q4', value: 162.8 },
  ],
  '5Y': [
    { time: '2020', value: 75.5 },
    { time: '2021', value: 112.3 },
    { time: '2022', value: 128.9 },
    { time: '2023', value: 145.6 },
    { time: '2024', value: 162.8 },
  ],
}

const volumeData = [
  { ticker: 'AAPL', volume: 85.4 },
  { ticker: 'MSFT', volume: 73.2 },
  { ticker: 'GOOGL', volume: 65.8 },
  { ticker: 'AMZN', volume: 52.3 },
  { ticker: 'META', volume: 43.9 },
  { ticker: 'TSLA', volume: 38.7 },
  { ticker: 'NVDA', volume: 35.2 },
]

export default function MarketDashboard() {
  const [timeRange, setTimeRange] = useState('1D')
  const [selectedMarket, setSelectedMarket] = useState('stocks')
  const [selectedStock, setSelectedStock] = useState('AAPL')
  
  // This would be replaced with real market data from an API
  const chartData = marketData[timeRange as keyof typeof marketData]
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">{selectedStock} Stock Performance</CardTitle>
              <CardDescription>$162.80 <span className="text-green-500">+2.35 (1.46%)</span></CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="stocks" onValueChange={setSelectedMarket}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="commodities">Commodities</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="AAPL" onValueChange={setSelectedStock}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
                  <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
                  <SelectItem value="GOOGL">Google (GOOGL)</SelectItem>
                  <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
                  <SelectItem value="META">Meta (META)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-start overflow-auto pb-2 -mb-2">
            <Tabs 
              defaultValue="1D" 
              value={timeRange} 
              onValueChange={setTimeRange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="3M">3M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
                <TabsTrigger value="5Y">5Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
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
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Volume Leaders</CardTitle>
            <CardDescription>Top stocks by trading volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={volumeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ticker" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market Movers</CardTitle>
            <CardDescription>Biggest price changes today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: 'TSLA', pct: 8.3 },
                    { name: 'NVDA', pct: 6.5 },
                    { name: 'AMD', pct: 4.2 },
                    { name: 'AAPL', pct: 2.1 },
                    { name: 'MSFT', pct: 1.7 },
                    { name: 'AMZN', pct: -1.2 },
                    { name: 'META', pct: -2.5 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="pct" 
                    stroke="hsl(var(--chart-3))" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}