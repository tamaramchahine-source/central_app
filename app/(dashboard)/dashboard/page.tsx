import { KpiCards } from "@/components/dashboard/kpi-cards"
import { SpendChart } from "@/components/dashboard/spend-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RiskChart } from "@/components/dashboard/risk-chart"
import { RecentSuppliers } from "@/components/dashboard/recent-suppliers"
import {
  mockDashboardStats,
  mockSpendTrend,
  mockSpendByCategory,
  mockRiskDistribution,
  mockSuppliers,
} from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da gestão de fornecedores
        </p>
      </div>

      <KpiCards stats={mockDashboardStats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SpendChart data={mockSpendTrend} />
        <CategoryChart data={mockSpendByCategory} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentSuppliers suppliers={mockSuppliers} />
        </div>
        <RiskChart data={mockRiskDistribution} />
      </div>
    </div>
  )
}
