import { Link } from 'react-router-dom'
import { DocLayout } from '@/components/docs/doc-layout'

const toc = [
  { id: 'support', label: 'Support' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'bug', label: 'Report a Bug' },
]

export function ContactPage() {
  return (
    <DocLayout title="Contact & Support" toc={toc}>
      <h2 id="support">Support</h2>
      <p>Need help? We&apos;re here for you.</p>
      <ul>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:support@example.com" className="text-primary hover:underline">
            support@example.com
          </a>
        </li>
        <li>
          <strong>Response time:</strong> Within 24 hours (business days)
        </li>
      </ul>

      <h2 id="documentation">Documentation</h2>
      <ul>
        <li>
          <Link to="/docs/getting-started">Getting Started</Link>
        </li>
        <li>
          <Link to="/docs/api">API Reference</Link>
        </li>
        <li>
          <Link to="/docs/webhooks">Webhooks</Link>
        </li>
        <li>
          <Link to="/docs/faqs">FAQs</Link>
        </li>
      </ul>

      <h2 id="enterprise">Enterprise</h2>
      <p>For custom deployments, SLA, or dedicated support:</p>
      <ul>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:enterprise@example.com" className="text-primary hover:underline">
            enterprise@example.com
          </a>
        </li>
        <li>
          <strong>Sales:</strong> <Link to="/pricing">Contact Sales</Link>
        </li>
      </ul>

      <h2 id="bug">Report a Bug</h2>
      <p>Please include:</p>
      <ul>
        <li>Steps to reproduce</li>
        <li>Expected vs actual behavior</li>
        <li>Browser and OS</li>
        <li>Any error messages</li>
      </ul>
      <p>
        Send to:{' '}
        <a href="mailto:support@example.com" className="text-primary hover:underline">
          support@example.com
        </a>{' '}
        with subject: <code>[Bug] ...</code>
      </p>
    </DocLayout>
  )
}
