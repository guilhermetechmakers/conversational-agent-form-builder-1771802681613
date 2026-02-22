import { api } from '@/lib/api'

export interface DemoAgentResponse {
  publicUrl: string
  agentTitle?: string
  agentId?: string
}

const FALLBACK_DEMO_PATH = '/chat/demo'

export async function getDemoAgentUrl(): Promise<string> {
  try {
    const res = await api.get<DemoAgentResponse>('/demo-agent')
    if (res.publicUrl) return res.publicUrl
  } catch {
    // API unavailable - use same-origin demo
  }
  return typeof window !== 'undefined'
    ? `${window.location.origin}${FALLBACK_DEMO_PATH}`
    : `https://app.example.com/agents/demo-public`
}
