import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, getRiskLabel } from "@/lib/utils"
import { ArrowRight, Building2 } from "lucide-react"
import type { Supplier } from "@/lib/types"

interface RecentSuppliersProps {
  suppliers: Supplier[]
}

export function RecentSuppliers({ suppliers }: RecentSuppliersProps) {
  const riskVariant = (level: string) => {
    switch (level) {
      case "low":
        return "success"
      case "medium":
        return "warning"
      case "high":
        return "danger"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Fornecedores Recentes</CardTitle>
        <Link href="/fornecedores">
          <Button variant="ghost" size="sm">
            Ver todos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suppliers.slice(0, 5).map((supplier) => (
            <div
              key={supplier.id}
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {supplier.country} • {supplier.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(supplier.spendT12)}</p>
                  <p className="text-sm text-muted-foreground">Spend T12</p>
                </div>
                <Badge variant={riskVariant(supplier.riskLevel)}>
                  {getRiskLabel(supplier.riskLevel)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
