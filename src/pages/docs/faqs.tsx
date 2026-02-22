import { Link } from 'react-router-dom'
import { DocLayout } from '@/components/docs/doc-layout'

const toc = [
  { id: 'general', label: 'General' },
  { id: 'pricing', label: 'Pricing & Limits' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'security', label: 'Security' },
]

export function FaqsPage() {
  return (
    <DocLayout title="FAQs" toc={toc}>
      <h2 id="general">General</h2>

      <h3>What is Agent Builder?</h3>
      <p>
        Agent Builder lets you create conversational forms—AI-powered agents that collect
        structured data through natural dialogue. Share a link, and visitors chat with your agent
        instead of filling out a form.
      </p>

      <h3>What&apos;s the difference from a form?</h3>
      <p>
        Traditional forms have fixed steps and high drop-off. Conversational agents adapt to user
        responses, handle ambiguity, and feel more natural. Completion rates are typically 2–3x
        higher.
      </p>

      <h3>Do I need to code?</h3>
      <p>
        No. The Agent Builder is a visual builder. For advanced integrations, we provide an API
        and webhooks.
      </p>

      <h2 id="pricing">Pricing & Limits</h2>

      <h3>What&apos;s included in the Free plan?</h3>
      <ul>
        <li>3 agents</li>
        <li>100 sessions per month</li>
        <li>Basic field types</li>
        <li>Public links</li>
      </ul>

      <h3>How do sessions work?</h3>
      <p>
        A session is one conversation with an agent. It starts when a user opens your link and ends
        when they complete or abandon the conversation.
      </p>

      <h3>Can I upgrade?</h3>
      <p>
        Yes. From the Dashboard, go to Settings → Billing to upgrade to Pro or contact us for
        Enterprise.
      </p>

      <h2 id="integrations">Integrations</h2>

      <h3>Where do leads go?</h3>
      <p>
        By default, leads are stored in your Dashboard. You can export them or connect webhooks to
        forward to your CRM, Slack, or custom backend.
      </p>

      <h3>What CRMs does Agent Builder support?</h3>
      <p>
        We support webhooks to any HTTP endpoint. Popular integrations include Salesforce, HubSpot,
        and Zapier.
      </p>

      <h3>Is there an API?</h3>
      <p>
        Yes. See the <Link to="/docs/api">API Reference</Link> for full documentation.
      </p>

      <h2 id="security">Security</h2>

      <h3>Is my data secure?</h3>
      <p>
        Yes. We use encryption in transit (TLS) and at rest. Data is stored in SOC 2 compliant
        infrastructure.
      </p>

      <h3>Can I use Agent Builder for sensitive data?</h3>
      <p>
        We support PII redaction and retention policies. For healthcare or financial data, contact
        us for Enterprise compliance options.
      </p>
    </DocLayout>
  )
}
