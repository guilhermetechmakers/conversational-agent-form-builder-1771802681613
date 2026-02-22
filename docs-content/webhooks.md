# Webhooks

Receive lead data in real-time when a conversation is completed.

## Payload Format

```json
{
  "event": "session.completed",
  "timestamp": "2024-01-15T12:00:00Z",
  "agentId": "agent_abc123",
  "sessionId": "sess_xyz789",
  "data": {
    "email": "user@example.com",
    "name": "Jane Doe",
    "company": "Acme Inc",
    "message": "Interested in enterprise plan"
  }
}
```

## Signature Verification

Webhook requests include an `X-Webhook-Signature` header. Verify using your webhook secret and HMAC-SHA256:

```javascript
const crypto = require('crypto');

const signature = req.headers['x-webhook-signature'];
const expected = crypto
  .createHmac('sha256', process.env.WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex');

if (signature !== expected) {
  return res.status(401).send('Invalid signature');
}
```
