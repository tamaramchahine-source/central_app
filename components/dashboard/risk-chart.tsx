"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RiskDistribution } from "@/lib/types"

interface RiskChartProps {
  data: RiskDistribution[]
}

const riskColors: Record<string, { bg: string; bar: string }> = {
  Baixo: { bg: "bg-emerald-100", bar: "bg-emerald-500" },
  Médio: { bg: "bg-amber-100", bar: "bg-amber-500" },
  Alto: { bg: "bg-red-100", bar: "bg-red-500" },
}

export function RiskChart({ data }: RiskChartProps) {
  const total = data.reduce((acc, item) => acc + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Risco</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const colors = riskColors[item.level] || {
              bg: "bg-muted",
              bar: "bg-muted-foreground",
            }
            return (
              <div key={item.level}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{item.level}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className={`h-3 w-full rounded-full ${colors.bg}`}>
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${colors.bar}`}
                    style={{ width: `${(item.count / total) * 100}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-6">
          {data.map((item) => {
            const colors = riskColors[item.level] || { bar: "bg-muted-foreground" }
            return (
              <div key={item.level} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${colors.bar}`} />
                <span className="text-sm text-muted-foreground">{item.level}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
