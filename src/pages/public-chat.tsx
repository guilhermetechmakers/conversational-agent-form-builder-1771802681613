import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Bot, Send, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Mock agent config based on slug
const getAgentConfig = (slug: string) => ({
  name: slug ? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Agent',
  greeting: "Hi! I'm here to help. What can I do for you today?",
  totalFields: 3,
  completedFields: 0,
})

export function PublicChatPage() {
  const { slug } = useParams<{ slug: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const config = getAgentConfig(slug ?? 'demo')

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content: config.greeting,
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
      }, 800)
    }
  }, [config.greeting, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Mock assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Thanks for sharing that! I've noted it down. Is there anything else you'd like to tell me?`,
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  const handleRestart = () => {
    setMessages([])
    setInput('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/20 text-primary">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm">{config.name}</h1>
            <p className="text-xs text-muted-foreground">Conversational form</p>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={handleRestart} aria-label="Restart">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </header>

      {/* Progress */}
      <div className="px-4 py-2 border-b border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{config.completedFields} / {config.totalFields} fields</span>
        </div>
        <Progress value={(config.completedFields / config.totalFields) * 100} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex gap-3 animate-fade-in',
              msg.role === 'user' && 'flex-row-reverse'
            )}
          >
            {msg.role === 'assistant' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border'
              )}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="rounded-2xl px-4 py-2.5 bg-card border border-border">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Your data is collected securely. Read our{' '}
          <a href="/privacy" className="text-primary hover:underline">privacy policy</a>.
        </p>
      </div>
    </div>
  )
}
