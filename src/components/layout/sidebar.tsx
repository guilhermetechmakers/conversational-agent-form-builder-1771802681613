import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Settings,
  Plug,
  CreditCard,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/agents', icon: Bot, label: 'Agents' },
  { to: '/dashboard/sessions', icon: MessageSquare, label: 'Sessions' },
  { to: '/dashboard/integrations', icon: Plug, label: 'Integrations' },
]

const bottomNavItems = [
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { to: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
  { to: '/help', icon: HelpCircle, label: 'Help' },
]

interface SidebarProps {
  collapsed?: boolean
  onCollapsedChange?: () => void
}

export function Sidebar({ collapsed = false, onCollapsedChange }: SidebarProps) {
  const { pathname } = useLocation()

  const toggleCollapsed = () => onCollapsedChange?.()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar border-r border-border transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      <div className={cn(
        'flex h-16 items-center border-b border-border',
        collapsed ? 'justify-center px-2' : 'justify-between px-4'
      )}>
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-sm">Agent Builder</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleCollapsed}
          className="shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.to || pathname.startsWith(item.to + '/')
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <Separator />
      <nav className="p-3 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
