import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bot,
  Link2,
  LayoutDashboard,
  Plug,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Illustration } from '@/components/illustration'
import { getDemoAgentUrl } from '@/api/demo-agent'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Bot,
    title: 'Agent Builder',
    description:
      'Create conversational agents with a visual builder. Configure persona, fields, and appearance without code.',
    href: '/docs/getting-started',
  },
  {
    icon: Link2,
    title: 'Conversational Links',
    description:
      'Share public agent URLs that launch chat-style forms. Fast link sharing, configurable persona and appearance.',
    href: '/docs/getting-started',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description:
      'Manage agents, view sessions, and track leads. Central hub for all your conversational forms.',
    href: '/docs',
  },
  {
    icon: Plug,
    title: 'Integrations',
    description:
      'Webhook integrations for lead forwarding. Connect to your CRM, Slack, or custom endpoints.',
    href: '/docs/webhooks',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description:
      'Track completion rates, drop-off points, and lead quality. Understand how your agents perform.',
    href: '/docs',
  },
]

const pricingPlans = [
  { name: 'Free', summary: 'Get started with 3 agents', href: '/pricing' },
  { name: 'Pro', summary: 'Unlimited agents & webhooks', href: '/pricing' },
  { name: 'Enterprise', summary: 'Custom solutions for teams', href: '/pricing' },
]

export function LandingPage() {
  const [isOpeningDemo, setIsOpeningDemo] = useState(false)

  const handleOpenDemo = async () => {
    trackEvent('demo_open')
    setIsOpeningDemo(true)
    try {
      const url = await getDemoAgentUrl()
      window.open(url, '_blank', 'noopener,noreferrer')
    } finally {
      setIsOpeningDemo(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute -bottom-40 right-1/3 h-80 w-80 rounded-full bg-orange/5 blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <Header />

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-left">
              Build conversational forms that{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                convert
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed text-left">
              Create link-shareable AI agents that collect structured data through natural dialogue.
              Higher completion rates, better lead quality, zero code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" onClick={() => trackEvent('cta_click', { location: 'hero', action: 'signup' })}>
                <Button size="lg" className="w-full sm:w-auto group">
                  Sign up — it&apos;s free
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline-orange"
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleOpenDemo}
                disabled={isOpeningDemo}
              >
                {isOpeningDemo ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange border-t-transparent" />
                    Opening...
                  </span>
                ) : (
                  <>
                    Try demo agent
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Hero illustration card */}
          <div
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'border border-border bg-card/80 shadow-card',
              'ring-1 ring-primary/10 shadow-[0_0_40px_rgba(79,255,143,0.08)]',
              'animate-fade-up'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="p-4 sm:p-6">
              <Illustration
                src="/assets/illustrations/hero-desktop.svg"
                alt="Agent Builder interface preview showing conversational form and dashboard"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to capture leads</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From building agents to sharing links and integrating with your stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className={cn(
                  'group transition-all duration-300',
                  'hover:shadow-glow hover:border-primary/30 hover:-translate-y-0.5'
                )}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={feature.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Live Demo card */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,255,143,0.08),transparent)]" />
          <CardHeader className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live demo</CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground max-w-2xl">
              See a conversational agent in action. Open the demo to start a sample conversation and
              experience how we capture structured data through natural dialogue.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Button
              size="lg"
              variant="outline-orange"
              onClick={handleOpenDemo}
              disabled={isOpeningDemo}
            >
              {isOpeningDemo ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange border-t-transparent" />
                  Opening...
                </span>
              ) : (
                <>
                  Open demo
                  <ExternalLink className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Pricing teaser */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple pricing</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.summary}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="outline" asChild className="w-full">
                  <Link to={plan.href}>View pricing</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Card className="relative overflow-hidden border-border bg-card p-12 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to transform your forms?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join teams using conversational agents to capture leads with higher quality and
              completion rates.
            </p>
            <Link to="/signup">
              <Button size="lg">Create your first agent</Button>
            </Link>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  )
}
