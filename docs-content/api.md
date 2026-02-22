# API Reference

REST API for programmatic access to agents and sessions.

## Base URL

```
https://api.example.com/v1
```

## Authentication

Include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### List Agents

```
GET /agents
```

Returns a list of your agents.

**Example (curl):**

```bash
curl -X GET "https://api.example.com/v1/agents" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Create Session

```
POST /agents/:agentId/sessions
```

Creates a new conversation session for an agent.

**Example (Node.js):**

```javascript
const res = await fetch('https://api.example.com/v1/agents/abc/sessions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ metadata: {} }),
});
const { sessionId } = await res.json();
```
