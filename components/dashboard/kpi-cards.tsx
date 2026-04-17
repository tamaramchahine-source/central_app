import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils"
import {
  Building2,
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Clock,
} from "lucide-react"
import type { DashboardStats } from "@/lib/types"

interface KpiCardsProps {
  stats: DashboardStats
}

const kpiConfig = [
  {
    key: "totalSuppliers" as const,
    label: "Total Fornecedores",
    icon: Building2,
    format: (v: number) => formatNumber(v),
    color: "text-primary bg-primary/10",
  },
  {
    key: "totalSpend" as const,
    label: "Spend Total (T12)",
    icon: DollarSign,
    format: (v: number) => formatCurrency(v),
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    key: "avgRiskScore" as const,
    label: "Risco Médio",
    icon: TrendingUp,
    format: (v: number) => formatNumber(v),
    suffix: "/100",
    color: "text-amber-600 bg-amber-50",
  },
  {
    key: "complianceRate" as const,
    label: "Taxa Compliance",
    icon: ShieldCheck,
    format: (v: number) => formatPercentage(v),
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    key: "highRiskCount" as const,
    label: "Alto Risco",
    icon: AlertTriangle,
    format: (v: number) => formatNumber(v),
    color: "text-red-600 bg-red-50",
  },
  {
    key: "pendingAudits" as const,
    label: "Auditorias Pendentes",
    icon: Clock,
    format: (v: number) => formatNumber(v),
    color: "text-amber-600 bg-amber-50",
  },
]

export function KpiCards({ stats }: KpiCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon
        const value = stats[kpi.key]
        return (
          <Card key={kpi.key}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </p>
                <div className={`rounded-lg p-2 ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">
                  {kpi.format(value)}
                  {kpi.suffix && (
                    <span className="text-base font-normal text-muted-foreground">
                      {kpi.suffix}
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
