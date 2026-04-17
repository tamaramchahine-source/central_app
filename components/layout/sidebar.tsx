"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  MessageSquare,
  Settings,
  FileText,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Fornecedores", href: "/fornecedores", icon: Building2 },
  { name: "Usuários", href: "/usuarios", icon: Users },
  { name: "Relatórios", href: "/relatorios", icon: FileText },
  { name: "Chat AI", href: "/chat", icon: MessageSquare },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">SRM</h1>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-accent/50 p-4">
          <p className="text-xs font-medium text-muted-foreground">Status do Sistema</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
