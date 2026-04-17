"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import type { SpendByCategory } from "@/lib/types"

interface CategoryChartProps {
  data: SpendByCategory[]
}

const COLORS = [
  "#0066ff",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
]

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="spend"
                nameKey="category"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, _, entry) => [
                  `${formatCurrency(value)} (${formatPercentage(entry.payload.percentage)})`,
                  entry.payload.category,
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e4e4e7",
                  borderRadius: "8px",
                }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
