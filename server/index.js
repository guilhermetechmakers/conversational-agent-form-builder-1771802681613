/**
 * API stub server for development.
 * Run: node server/index.js
 * Vite proxies /api to this server when VITE_API_PROXY=true or when using npm run dev with proxy config.
 *
 * For production, deploy a real backend (Express, Next.js API routes, etc.)
 */

const http = require('http')

const PORT = process.env.API_PORT || 3001
const DEMO_AGENT_URL = process.env.DEMO_AGENT_URL || '/chat/demo'

const DEMO_AGENT = {
  publicUrl: DEMO_AGENT_URL.startsWith('http') ? DEMO_AGENT_URL : DEMO_AGENT_URL,
  agentTitle: 'Demo Agent',
  agentId: 'demo',
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`)
  const path = url.pathname

  // GET /api/demo-agent
  if (path === '/api/demo-agent' && req.method === 'GET') {
    json(res, 200, DEMO_AGENT)
    return
  }

  // POST /api/auth/signup
  if (path === '/api/auth/signup' && req.method === 'POST') {
    const body = await parseBody(req)
    const { email, password, name } = body
    if (!email || !password) {
      json(res, 400, { message: 'Email and password are required' })
      return
    }
    if (password.length < 8) {
      json(res, 400, { message: 'Password must be at least 8 characters' })
      return
    }
    const token = `stub.${Buffer.from(JSON.stringify({ sub: '1', email, name })).toString('base64')}.sig`
    json(res, 200, {
      token,
      user: { id: '1', email, name: name || null },
    })
    return
  }

  // POST /api/auth/login
  if (path === '/api/auth/login' && req.method === 'POST') {
    const body = await parseBody(req)
    const { email, password } = body
    if (!email || !password) {
      json(res, 400, { message: 'Email and password are required' })
      return
    }
    const token = `stub.${Buffer.from(JSON.stringify({ sub: '1', email })).toString('base64')}.sig`
    json(res, 200, {
      token,
      user: { id: '1', email, name: 'User' },
    })
    return
  }

  // POST /api/auth/sso/start
  if (path === '/api/auth/sso/start' && req.method === 'POST') {
    const body = await parseBody(req)
    const { provider } = body
    if (!provider || !['google', 'github'].includes(provider)) {
      json(res, 400, { message: 'Invalid provider' })
      return
    }
    json(res, 501, {
      message: 'SSO not configured. Set up OAuth credentials for production.',
      url: '/login',
    })
    return
  }

  json(res, 404, { message: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`API stub server running at http://localhost:${PORT}`)
  console.log(`Demo agent URL: ${DEMO_AGENT.publicUrl}`)
})
