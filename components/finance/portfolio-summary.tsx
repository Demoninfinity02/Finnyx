"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Mock data - would normally come from an API
const portfolioData = [
  { name: 'AAPL', value: 35, percentage: '35%', color: 'hsl(var(--chart-1))' },
  { name: 'MSFT', value: 25, percentage: '25%', color: 'hsl(var(--chart-2))' },
  { name: 'GOOGL', value: 15, percentage: '15%', color: 'hsl(var(--chart-3))' },
  { name: 'AMZN', value: 10, percentage: '10%', color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 15, percentage: '15%', color: 'hsl(var(--chart-5))' },
]

const stats = [
  { label: 'Total Value', value: '$125,432.67' },
  { label: 'Daily Change', value: '+$2,341.25 (+1.9%)' },
  { label: 'Total Return', value: '+32.7%' },
  { label: 'Dividends', value: '$1,243.55' },
]

export default function PortfolioSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Asset allocation and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Allocation</h4>
          <div className="grid grid-cols-2 gap-2">
            {portfolioData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{item.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}