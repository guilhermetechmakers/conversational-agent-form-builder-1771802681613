import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Code, Webhook, HelpCircle, Mail } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'

const docNav = [
  { href: '/docs/getting-started', label: 'Getting Started', icon: BookOpen },
  { href: '/docs/api', label: 'API Reference', icon: Code },
  { href: '/docs/webhooks', label: 'Webhooks', icon: Webhook },
  { href: '/docs/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/docs/contact', label: 'Contact & Support', icon: Mail },
]

interface DocLayoutProps {
  children: React.ReactNode
  title: string
  toc?: { id: string; label: string }[]
}

export function DocLayout({ children, title, toc = [] }: DocLayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <nav className="sticky top-24 space-y-1">
              <Link
                to="/docs"
                className="block text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Documentation
              </Link>
              {docNav.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-primary/20 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <article className="prose prose-invert prose-headings:font-semibold max-w-none">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
              {toc.length > 0 && (
                <nav className="mb-8 p-4 rounded-xl bg-card border border-border">
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">On this page</h2>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="prose-p:text-muted-foreground prose-a:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border">
                {children}
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
