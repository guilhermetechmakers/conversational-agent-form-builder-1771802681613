import { Link } from 'react-router-dom'
import { Code, Webhook, Rocket, HelpCircle, Mail } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const docSections = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description: 'Set up your first conversational agent in minutes.',
    href: '/docs/getting-started',
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'REST API endpoints for programmatic access.',
    href: '/docs/api',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Receive lead data via webhook integrations.',
    href: '/docs/webhooks',
  },
  {
    icon: HelpCircle,
    title: 'FAQs & Support',
    description: 'Common questions and contact information.',
    href: '/docs/faqs',
  },
  {
    icon: Mail,
    title: 'Contact & Support',
    description: 'Get help or reach out to our team.',
    href: '/docs/contact',
  },
]

export function DocsIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to build and integrate conversational agents.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {docSections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} to={section.href}>
                <Card className="h-full transition-all duration-300 hover:shadow-glow hover:border-primary/30 hover:-translate-y-0.5">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
