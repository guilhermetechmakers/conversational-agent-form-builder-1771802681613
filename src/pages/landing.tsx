import { Link } from 'react-router-dom'
import { Bot, MessageSquare, Zap, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: MessageSquare,
    title: 'Conversational Forms',
    description: 'Replace brittle step-by-step forms with friendly, persona-driven conversations that increase completion rates.',
  },
  {
    icon: Zap,
    title: 'LLM-Powered',
    description: 'AI orchestrates natural dialogue, captures structured data, and adapts to user responses in real-time.',
  },
  {
    icon: Shield,
    title: 'Privacy & Compliance',
    description: 'PII redaction, retention policies, and audit trails built-in for enterprise compliance.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-lg">Agent Builder</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Build conversational forms that{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              convert
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create link-shareable AI agents that collect structured data through natural dialogue. 
            Higher completion rates, better lead quality, zero code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto group">
                Start building free
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Try live demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Bento grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={cn(
                  'rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-glow hover:border-primary/30',
                  i === 0 && 'md:col-span-2 md:row-span-2 flex flex-col justify-center'
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="rounded-2xl border border-border bg-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your forms?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join teams using conversational agents to capture leads with higher quality and completion rates.
            </p>
            <Link to="/signup">
              <Button size="lg">Create your first agent</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-medium">Agent Builder</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/help" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
