import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bot, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

const navLinks = [
  { to: '/#features', label: 'Product' },
  { to: '/docs', label: 'Docs' },
  { to: '/pricing', label: 'Pricing' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl transition-shadow',
        location.pathname === '/' && 'shadow-none'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
          aria-label="Agent Builder home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-lg">Agent Builder</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="ghost"
              onClick={() => trackEvent('cta_click', { location: 'header', action: 'login' })}
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              onClick={() => trackEvent('cta_click', { location: 'header', action: 'signup' })}
            >
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile nav - slide in */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-out',
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-4 border-t border-border/50">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMobile}
              className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
            <Link to="/login" onClick={closeMobile}>
              <Button variant="ghost" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link to="/signup" onClick={closeMobile}>
              <Button className="w-full justify-center">Sign up</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
