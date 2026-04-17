import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate, getRiskLabel } from "@/lib/utils"
import { ArrowLeft, Pencil, Mail, Phone, Calendar, DollarSign } from "lucide-react"
import { mockSuppliers } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SupplierDetailPage({ params }: PageProps) {
  const { id } = await params
  const supplier = mockSuppliers.find((s) => s.id === id)

  if (!supplier) {
    notFound()
  }

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

  const complianceVariant = (status: string) => {
    switch (status) {
      case "compliant":
        return "success"
      case "pending":
        return "warning"
      case "non_compliant":
        return "danger"
      default:
        return "secondary"
    }
  }

  const complianceLabel = (status: string) => {
    switch (status) {
      case "compliant":
        return "Conforme"
      case "pending":
        return "Pendente"
      case "non_compliant":
        return "Não conforme"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/fornecedores">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                {supplier.name}
              </h1>
              <Badge variant={riskVariant(supplier.riskLevel)}>
                {getRiskLabel(supplier.riskLevel)}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {supplier.id} • {supplier.country} • {supplier.category}
            </p>
          </div>
        </div>
        <Link href={`/fornecedores/${supplier.id}/editar`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spend T6</p>
                <p className="text-lg font-bold">{formatCurrency(supplier.spendT6)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spend T12</p>
                <p className="text-lg font-bold">{formatCurrency(supplier.spendT12)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <span className="text-sm font-bold">{supplier.riskScore}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Score de Risco</p>
                <p className="text-lg font-bold">{getRiskLabel(supplier.riskLevel)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Badge variant={complianceVariant(supplier.complianceStatus)} className="h-10 px-4">
                {complianceLabel(supplier.complianceStatus)}
              </Badge>
              <div>
                <p className="text-sm text-muted-foreground">Compliance</p>
                <p className="text-lg font-bold">Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{supplier.contactEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{supplier.contactPhone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Datas Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Última Auditoria</p>
                <p className="font-medium">{formatDate(supplier.lastAuditDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fim do Contrato</p>
                <p className="font-medium">{formatDate(supplier.contractEndDate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {supplier.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{supplier.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
