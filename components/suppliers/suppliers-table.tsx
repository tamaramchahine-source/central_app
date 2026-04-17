"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate, getRiskLabel } from "@/lib/utils"
import { Eye, Pencil, Trash2 } from "lucide-react"
import type { Supplier } from "@/lib/types"

interface SuppliersTableProps {
  suppliers: Supplier[]
  onDelete: (id: string) => void
}

export function SuppliersTable({ suppliers, onDelete }: SuppliersTableProps) {
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
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Fornecedor
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                País
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Categoria
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Risco
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Compliance
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Spend T12
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Última Auditoria
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="bg-card hover:bg-accent/50">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-mono">
                  {supplier.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <p className="font-medium">{supplier.name}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {supplier.country}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {supplier.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={riskVariant(supplier.riskLevel)}>
                    {getRiskLabel(supplier.riskLevel)} ({supplier.riskScore})
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge variant={complianceVariant(supplier.complianceStatus)}>
                    {complianceLabel(supplier.complianceStatus)}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
                  {formatCurrency(supplier.spendT12)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {formatDate(supplier.lastAuditDate)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/fornecedores/${supplier.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalhes</span>
                      </Button>
                    </Link>
                    <Link href={`/fornecedores/${supplier.id}/editar`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(supplier.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {suppliers.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          Nenhum fornecedor encontrado
        </div>
      )}
    </div>
  )
}
