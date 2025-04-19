"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for different charts
const sectorPerformance = [
  { name: 'Technology', value: 12.5 },
  { name: 'Healthcare', value: 8.3 },
  { name: 'Financial', value: 6.2 },
  { name: 'Consumer', value: 5.4 },
  { name: 'Energy', value: -2.7 },
  { name: 'Utilities', value: -1.5 },
  { name: 'Real Estate', value: -3.8 },
];

const marketTrends = [
  { month: 'Jan', sp500: 4200, nasdaq: 14200, dow: 36500 },
  { month: 'Feb', sp500: 4250, nasdaq: 14100, dow: 36800 },
  { month: 'Mar', sp500: 4300, nasdaq: 14300, dow: 37000 },
  { month: 'Apr', sp500: 4400, nasdaq: 14500, dow: 37200 },
  { month: 'May', sp500: 4450, nasdaq: 14700, dow: 37100 },
  { month: 'Jun', sp500: 4500, nasdaq: 14900, dow: 37300 },
  { month: 'Jul', sp500: 4600, nasdaq: 15200, dow: 37500 },
];

const assetAllocation = [
  { name: 'Stocks', value: 60, color: 'hsl(var(--chart-1))' },
  { name: 'Bonds', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Cash', value: 10, color: 'hsl(var(--chart-3))' },
  { name: 'Alternatives', value: 5, color: 'hsl(var(--chart-4))' },
];

export default function MarketAnalysis() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Market Analysis</h2>
        <p className="text-muted-foreground">Latest market trends and analysis</p>
      </div>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue="sector-performance">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sector-performance">Sector Performance</TabsTrigger>
              <TabsTrigger value="market-trends">Market Trends</TabsTrigger>
              <TabsTrigger value="asset-allocation">Asset Allocation</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sector-performance">
            <TabsContent value="sector-performance" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sectorPerformance}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={70}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--chart-2))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="market-trends" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={marketTrends}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sp500" 
                    name="S&P 500"
                    stroke="hsl(var(--chart-1))" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="nasdaq" 
                    name="NASDAQ"
                    stroke="hsl(var(--chart-2))" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dow" 
                    name="Dow Jones"
                    stroke="hsl(var(--chart-3))" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="asset-allocation" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}