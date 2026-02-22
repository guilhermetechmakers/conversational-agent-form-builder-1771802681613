import { Link } from 'react-router-dom'
import { Bot, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Bot className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page not found</h2>
        <p className="text-muted-foreground mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Go home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
