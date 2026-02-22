import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Getting Started</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Create your first conversational agent in under 5 minutes.
        </p>

        <div className="prose prose-invert prose-primary max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Create an account</h2>
            <p className="text-muted-foreground mb-4">
              Sign up for a free account to access the Agent Builder dashboard.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              Sign up free
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Create your first agent</h2>
            <p className="text-muted-foreground mb-4">
              From the dashboard, click &quot;Create agent&quot;. Configure the agent name, greeting
              message, and the fields you want to collect. You can add text, email, phone, and
              custom field types.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Get your public link</h2>
            <p className="text-muted-foreground mb-4">
              Once your agent is configured, you&apos;ll receive a unique public URL. Share this
              link anywhere — on your website, in emails, or on social media. Visitors can start a
              conversation immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Connect webhooks (optional)</h2>
            <p className="text-muted-foreground mb-4">
              Forward captured leads to your CRM, Slack, or custom endpoint. See the{' '}
              <Link to="/docs/webhooks" className="text-primary hover:underline">
                Webhooks guide
              </Link>{' '}
              for setup instructions.
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </div>
  )
}
