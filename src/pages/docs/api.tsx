import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">API Reference</h1>
        <p className="text-lg text-muted-foreground mb-8">
          REST API for programmatic access to agents and sessions.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
            <pre className="p-4 rounded-lg bg-muted/50 text-sm overflow-x-auto">
              <code>https://api.example.com/v1</code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <p className="text-muted-foreground mb-4">
              Include your API key in the Authorization header:
            </p>
            <pre className="p-4 rounded-lg bg-muted/50 text-sm overflow-x-auto">
              <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">List Agents</h2>
            <pre className="p-4 rounded-lg bg-muted/50 text-sm overflow-x-auto mb-4">
              <code>{`GET /agents`}</code>
            </pre>
            <p className="text-muted-foreground mb-4">Returns a list of your agents.</p>
            <h3 className="text-lg font-medium mb-2">Example (curl)</h3>
            <pre className="p-4 rounded-lg bg-muted/50 text-sm overflow-x-auto">
              <code>{`curl -X GET "https://api.example.com/v1/agents" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Create Session</h2>
            <pre className="p-4 rounded-lg bg-muted/50 text-sm overflow-x-auto mb-4">
              <code>{`POST /agents/:agentId/sessions`}</code>
            </pre>
            <p className="text-muted-foreground mb-4">
              Creates a new conversation session for an agent.
            </p>
            <h3 className="text-lg font-medium mb-2">Example (Node.js)</h3>
            <pre className="p-4 rounded-lg bg-muted/50 text-sm overflow-x-auto">
              <code>{`const res = await fetch('https://api.example.com/v1/agents/abc/sessions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ metadata: {} }),
});
const { sessionId } = await res.json();`}</code>
            </pre>
          </section>
        </div>
      </article>
      <Footer />
    </div>
  )
}
