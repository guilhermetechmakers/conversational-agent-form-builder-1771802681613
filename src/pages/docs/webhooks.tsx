import { DocLayout } from '@/components/docs/doc-layout'

const toc = [
  { id: 'setup', label: 'Setup' },
  { id: 'events', label: 'Events' },
  { id: 'payload', label: 'Payload Format' },
  { id: 'signature', label: 'Signature Verification' },
  { id: 'retry', label: 'Retry Policy' },
  { id: 'best-practices', label: 'Best Practices' },
]

export function WebhooksDocsPage() {
  return (
    <DocLayout title="Webhooks" toc={toc}>
      <p>
        Webhooks notify your application when events occur in Agent Builder, such as session
        completion or lead capture.
      </p>

      <h2 id="setup">Setup</h2>
      <ol>
        <li>Go to <strong>Dashboard → Integrations → Webhooks</strong></li>
        <li>Add your webhook URL (must be HTTPS)</li>
        <li>Select events to subscribe to</li>
        <li>Optionally add a secret for signature verification</li>
      </ol>

      <h2 id="events">Events</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border rounded-lg">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-2 text-left">Event</th>
              <th className="border border-border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2">
                <code>session.completed</code>
              </td>
              <td className="border border-border px-4 py-2">
                User finished the conversation and all required fields were collected
              </td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">
                <code>session.started</code>
              </td>
              <td className="border border-border px-4 py-2">User began a new session</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">
                <code>session.abandoned</code>
              </td>
              <td className="border border-border px-4 py-2">User left without completing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="payload">Payload Format</h2>
      <pre className="rounded-lg p-4 bg-card border border-border overflow-x-auto text-sm">
        <code>{`{
  "id": "evt_abc123",
  "type": "session.completed",
  "createdAt": "2024-01-15T10:30:00Z",
  "data": {
    "sessionId": "sess_xyz",
    "agentId": "agent_123",
    "agentTitle": "Lead Capture",
    "fields": {
      "email": "user@example.com",
      "name": "Jane Doe",
      "company": "Acme Inc"
    },
    "metadata": {
      "userAgent": "Mozilla/5.0...",
      "referrer": "https://example.com"
    }
  }
}`}</code>
      </pre>

      <h2 id="signature">Signature Verification</h2>
      <p>
        If you set a webhook secret, we include an <code>X-Webhook-Signature</code> header:
      </p>
      <pre className="rounded-lg p-4 bg-card border border-border overflow-x-auto text-sm">
        <code>X-Webhook-Signature: sha256=abc123...</code>
      </pre>
      <p>Verify with HMAC-SHA256:</p>
      <pre className="rounded-lg p-4 bg-card border border-border overflow-x-auto text-sm">
        <code>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</code>
      </pre>

      <h2 id="retry">Retry Policy</h2>
      <p>Failed deliveries are retried with exponential backoff:</p>
      <ul>
        <li>1 min, 5 min, 10 min, 30 min, 1 hour</li>
        <li>Up to 5 retries</li>
        <li>Return 2xx to acknowledge receipt</li>
      </ul>

      <h2 id="best-practices">Best Practices</h2>
      <ol>
        <li>Return 200 quickly; process asynchronously</li>
        <li>Store event IDs to avoid duplicates</li>
        <li>Validate the signature before processing</li>
        <li>Use idempotency keys for your own operations</li>
      </ol>
    </DocLayout>
  )
}
