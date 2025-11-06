import { NavLink } from '@/components/NavLink';
import { LayoutDashboard, Workflow, History, Shield, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Executions', href: '/executions', icon: History },
  { name: 'Audit', href: '/audit', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-sidebar-border/50 bg-sidebar/95 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center border-b border-sidebar-border/50 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <span className="text-lg font-bold text-primary-foreground">n8</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">
                n8n <span className="gradient-text">Observer</span>
              </h1>
              <p className="text-xs text-muted-foreground">Monitor</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:shadow-md",
                "hover:translate-x-1"
              )}
              activeClassName="bg-gradient-primary text-primary-foreground shadow-glow translate-x-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border/50 p-4 space-y-3">
          <div className="rounded-xl bg-gradient-to-br from-sidebar-accent/50 to-sidebar-accent/30 p-4 backdrop-blur-sm border border-sidebar-border/30">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
              <p className="text-xs font-semibold text-sidebar-accent-foreground">
                Connected to n8n
              </p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground ml-4">
              API Key configured
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
