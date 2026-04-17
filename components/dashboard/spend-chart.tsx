"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { formatCurrency } from "@/lib/utils"

interface SpendChartProps {
  data: Array<{ month: string; spend: number }>
}

export function SpendChart({ data }: SpendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend Mensal (T6)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#71717a", fontSize: 12 }}
                axisLine={{ stroke: "#e4e4e7" }}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 12 }}
                axisLine={{ stroke: "#e4e4e7" }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Spend"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e4e4e7",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="spend" fill="#0066ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
