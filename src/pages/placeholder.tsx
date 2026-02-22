import { Link, useLocation } from 'react-router-dom'
import { Bot, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface PlaceholderPageProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  const location = useLocation()
  const isDashboardRoute = location.pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" asChild>
          <Link to={isDashboardRoute ? '/dashboard' : '/'} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {isDashboardRoute ? 'Back to Dashboard' : 'Back to Home'}
          </Link>
        </Button>
      <Card className="max-w-lg">
        <CardHeader>
          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-2">
            {icon ?? <Bot className="h-6 w-6 text-primary" />}
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This page is under construction. Check back soon!
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
