import { Link } from 'react-router-dom'
import { Bot, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Get started with conversational forms',
    features: ['3 agents', '100 sessions/month', 'Basic fields', 'Public links'],
    cta: 'Get started',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing teams',
    features: ['Unlimited agents', '1,000 sessions/month', 'All field types', 'Webhooks', 'Custom branding', 'Priority support'],
    cta: 'Start trial',
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['Everything in Pro', 'Unlimited sessions', 'SAML SSO', 'Custom domains', 'Dedicated support', 'SLA'],
    cta: 'Contact sales',
    href: '/contact',
    highlighted: false,
  },
]

export function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-lg">Agent Builder</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'relative',
                plan.highlighted && 'border-primary shadow-glow'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="w-full"
                >
                  <Link to={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
