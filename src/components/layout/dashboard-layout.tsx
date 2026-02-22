import * as React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, User } from 'lucide-react'

const SidebarContext = React.createContext<{ collapsed: boolean }>({ collapsed: false })

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function DashboardLayout() {
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved !== null) setCollapsed(JSON.parse(saved))
  }, [])

  const handleCollapsedChange = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('sidebar-collapsed', JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <div className="min-h-screen bg-background">
        <Sidebar onCollapsedChange={handleCollapsedChange} collapsed={collapsed} />
        <div
          className="transition-[margin] duration-300"
          style={{ marginLeft: collapsed ? 72 : 256 }}
        >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-sm">
                    {user?.name?.[0] ?? user?.email?.[0] ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm">{user?.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
