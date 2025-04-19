import { Metadata } from 'next'
import AIAssistantChat from '@/components/assistant/ai-assistant-chat'

export const metadata: Metadata = {
  title: 'AI Financial Assistant - Finnyx',
  description: 'Get personalized financial advice and insights from our AI assistant',
}

export default function AssistantPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          AI Financial Assistant
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Get personalized financial advice, market insights, and answers to your questions
        </p>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl mx-auto">
          Powered by Ollama using the qwen2.5:0.5b model running locally on your machine
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <AIAssistantChat />
      </div>
    </div>
  )
}