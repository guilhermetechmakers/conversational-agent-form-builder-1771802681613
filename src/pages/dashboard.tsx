import { Link } from 'react-router-dom'
import { Bot, Plus, MessageSquare, TrendingUp, Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

// Mock data for demo
const mockAgents = [
  { id: '1', name: 'Lead Capture', slug: 'lead-capture', status: 'published', sessions: 142, completionRate: 78 },
  { id: '2', name: 'Support Intake', slug: 'support-intake', status: 'draft', sessions: 0, completionRate: 0 },
  { id: '3', name: 'Event Registration', slug: 'event-reg', status: 'published', sessions: 89, completionRate: 92 },
]

const mockStats = [
  { label: 'Total Agents', value: '3', icon: Bot, trend: null },
  { label: 'Sessions (30d)', value: '231', icon: MessageSquare, trend: '+12%' },
  { label: 'Completion Rate', value: '84%', icon: TrendingUp, trend: '+5%' },
]

function copyLink(slug: string) {
  const url = `${window.location.origin}/chat/${slug}`
  navigator.clipboard.writeText(url)
  toast.success('Link copied to clipboard')
}

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your conversational agents and view session analytics
          </p>
        </div>
        <Link to="/dashboard/agents/new">
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {mockStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.trend && (
                  <p className="text-xs text-success mt-1">{stat.trend} from last month</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Agents list */}
      <Card>
        <CardHeader>
          <CardTitle>Your Agents</CardTitle>
          <CardDescription>Agents you&apos;ve created and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{agent.name}</span>
                      <Badge variant={agent.status === 'published' ? 'success' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {agent.sessions} sessions
                      {agent.completionRate > 0 && ` · ${agent.completionRate}% completion`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {agent.status === 'published' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyLink(agent.slug)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy link
                      </Button>
                      <Link to={`/chat/${agent.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link to={`/dashboard/agents/${agent.id}/edit`}>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
