"use client"

import { useState } from 'react'
import { Calculator, PiggyBank, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function FinancialCalculators() {
  const [compoundTab, setCompoundTab] = useState({
    principal: 10000,
    monthlyContribution: 500,
    years: 20,
    rate: 7,
  })
  
  const [mortgageTab, setMortgageTab] = useState({
    homePrice: 400000,
    downPayment: 80000,
    loanTerm: 30,
    interestRate: 5.5,
  })
  
  // Calculate compound interest results
  const calculateCompoundInterest = () => {
    const { principal, monthlyContribution, years, rate } = compoundTab
    const monthlyRate = rate / 100 / 12
    const months = years * 12
    
    let balance = principal
    const data = [{ year: 0, balance: principal }]
    
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution
      }
      data.push({
        year,
        balance: Math.round(balance),
      })
    }
    
    return data
  }
  
  // Calculate mortgage payment
  const calculateMortgage = () => {
    const { homePrice, downPayment, loanTerm, interestRate } = mortgageTab
    const loanAmount = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    
    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: (monthlyPayment * numberOfPayments).toFixed(2),
      totalInterest: ((monthlyPayment * numberOfPayments) - loanAmount).toFixed(2),
    }
  }
  
  const compoundData = calculateCompoundInterest()
  const mortgageResults = calculateMortgage()
  
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Financial Calculators</h2>
        <p className="text-muted-foreground">Tools to help with your financial planning</p>
      </div>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue="compound-interest">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="compound-interest" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Compound Interest</span>
              </TabsTrigger>
              <TabsTrigger value="mortgage-calculator" className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4" />
                <span>Mortgage Calculator</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="compound-interest">
            <TabsContent value="compound-interest">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Initial Investment</Label>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={compoundTab.principal}
                        onChange={(e) => setCompoundTab({...compoundTab, principal: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Monthly Contribution</Label>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={compoundTab.monthlyContribution}
                        onChange={(e) => setCompoundTab({...compoundTab, monthlyContribution: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Years</Label>
                      <span className="text-sm text-muted-foreground">{compoundTab.years} years</span>
                    </div>
                    <Slider 
                      min={1} 
                      max={40} 
                      step={1} 
                      value={[compoundTab.years]}
                      onValueChange={(value) => setCompoundTab({...compoundTab, years: value[0]})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Annual Return (%)</Label>
                      <span className="text-sm text-muted-foreground">{compoundTab.rate}%</span>
                    </div>
                    <Slider 
                      min={1} 
                      max={15} 
                      step={0.1} 
                      value={[compoundTab.rate]}
                      onValueChange={(value) => setCompoundTab({...compoundTab, rate: value[0]})}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={compoundData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="hsl(var(--chart-1))"
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Results</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Initial Investment</p>
                        <p className="font-semibold">${compoundTab.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Contributions</p>
                        <p className="font-semibold">${(compoundTab.monthlyContribution * compoundTab.years * 12).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Final Balance</p>
                        <p className="font-semibold text-lg text-primary">${compoundData[compoundData.length - 1].balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Earned</p>
                        <p className="font-semibold">${(compoundData[compoundData.length - 1].balance - compoundTab.principal - (compoundTab.monthlyContribution * compoundTab.years * 12)).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mortgage-calculator">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Home Price</Label>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={mortgageTab.homePrice}
                        onChange={(e) => setMortgageTab({...mortgageTab, homePrice: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Down Payment</Label>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={mortgageTab.downPayment}
                        onChange={(e) => setMortgageTab({...mortgageTab, downPayment: Number(e.target.value)})}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      {((mortgageTab.downPayment / mortgageTab.homePrice) * 100).toFixed(1)}% of home price
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Loan Term (years)</Label>
                      <span className="text-sm text-muted-foreground">{mortgageTab.loanTerm} years</span>
                    </div>
                    <Slider 
                      min={5} 
                      max={30} 
                      step={5} 
                      value={[mortgageTab.loanTerm]}
                      onValueChange={(value) => setMortgageTab({...mortgageTab, loanTerm: value[0]})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Interest Rate (%)</Label>
                      <span className="text-sm text-muted-foreground">{mortgageTab.interestRate}%</span>
                    </div>
                    <Slider 
                      min={2} 
                      max={10} 
                      step={0.125} 
                      value={[mortgageTab.interestRate]}
                      onValueChange={(value) => setMortgageTab({...mortgageTab, interestRate: value[0]})}
                    />
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-lg flex flex-col justify-center">
                  <h3 className="text-xl font-medium mb-6 text-center">Mortgage Details</h3>
                  
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-3xl font-bold text-primary">${Number(mortgageResults.monthlyPayment).toLocaleString()}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold">${(mortgageTab.homePrice - mortgageTab.downPayment).toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Down Payment</p>
                        <p className="font-semibold">${mortgageTab.downPayment.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Payments</p>
                        <p className="font-semibold">${Number(mortgageResults.totalPayment).toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Interest</p>
                        <p className="font-semibold">${Number(mortgageResults.totalInterest).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="mt-6">See Detailed Amortization</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}