"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, RefreshCw, Info, ArrowRight, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const predefinedQuestions = [
  "What stocks should I invest in for long-term growth?",
  "How do I start building a diversified portfolio?",
  "What is the difference between ETFs and mutual funds?",
  "How much should I save for retirement?",
  "Explain dollar-cost averaging and its benefits",
  "What are the tax implications of selling investments?",
]

export default function AIAssistantChat() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI financial assistant powered by Ollama (qwen2.5:0.5b). I can help with financial questions and insights. Note that I'm running locally on your machine through the Ollama service.",
      timestamp: new Date(),
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    setConnectionError(null)
    
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }
    
    setMessages([...messages, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    try {
      // Call Ollama API running on default port
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen2.5:0.5b',
          prompt: inputValue,
          stream: false
        }),
      })
      
      if (!response.ok) {
        throw new Error(`Error connecting to Ollama: ${response.status}`)
      }
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }
      
      setMessages(prevMessages => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error('Error calling Ollama:', error)
      setConnectionError('Failed to connect to Ollama. Make sure the Ollama server is running on the default port (11434) and the qwen2.5:0.5b model is installed.')
      
      // Add error message to chat
      const errorMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: "I'm having trouble connecting to the AI model. Please make sure Ollama is running with the qwen2.5:0.5b model installed.",
        timestamp: new Date(),
      }
      
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }
  
  const handlePredefinedQuestion = (question: string) => {
    setInputValue(question)
  }
  
  const resetConversation = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: "Hello! I'm your AI financial assistant powered by Ollama (qwen2.5:0.5b). I can help with financial questions and insights. Note that I'm running locally on your machine through the Ollama service.",
        timestamp: new Date(),
      }
    ])
    setConnectionError(null)
  }
  
  return (
    <Card className="border shadow-lg h-[600px] flex flex-col">
      <CardHeader className="px-4 pt-4 pb-0">
        <CardTitle>AI Financial Assistant</CardTitle>
        <CardDescription>
          Ask questions about finance, investments, and personal financial planning
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        {connectionError && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              {connectionError}
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="chat" className="flex flex-col h-full">
          <TabsList className="w-full rounded-none border-b justify-start h-auto p-0">
            <TabsTrigger value="chat" className="rounded-none flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3">
              Chat
            </TabsTrigger>
            <TabsTrigger value="suggested" className="rounded-none flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3">
              Suggested Questions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="m-0 h-full flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      } p-3 rounded-lg`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md ${
                        message.role === 'user' 
                          ? 'bg-primary-foreground text-primary' 
                          : 'bg-background'
                      }`}>
                        {message.role === 'user' 
                          ? <User className="h-4 w-4" /> 
                          : <Bot className="h-4 w-4" />
                        }
                      </div>
                      <div>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <div className={`mt-1 text-xs ${
                          message.role === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  placeholder="Ask a financial question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || inputValue.trim() === ''}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="suggested" className="m-0 p-4 h-full">
            <div className="grid gap-2">
              <h3 className="font-medium text-lg mb-2">Popular Financial Questions</h3>
              {predefinedQuestions.map((question, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => handlePredefinedQuestion(question)}
                >
                  <div className="flex items-start gap-2 text-left">
                    <ArrowRight className="h-4 w-4 mt-1 shrink-0" />
                    <span>{question}</span>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t px-4 py-2 flex justify-between items-center bg-muted/50">
        <CardDescription>
          Powered by Ollama (qwen2.5:0.5b model)
        </CardDescription>
        <Button variant="ghost" size="sm" onClick={resetConversation} className="h-8 text-xs">
          <RefreshCw className="h-3 w-3 mr-2" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}