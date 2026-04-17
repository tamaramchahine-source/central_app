"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SuppliersTable } from "@/components/suppliers/suppliers-table"
import { SupplierFilters } from "@/components/suppliers/supplier-filters"
import { Plus, Download, Loader2 } from "lucide-react"
import type { Supplier, SupplierFilters as Filters } from "@/lib/types"

export default function FornecedoresPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [filters, setFilters] = useState<Filters>({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set("search", filters.search)
      if (filters.country) params.set("country", filters.country)
      if (filters.category) params.set("category", filters.category)
      if (filters.riskLevel) params.set("riskLevel", filters.riskLevel)

      const response = await fetch(`/api/suppliers?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setSuppliers(data.suppliers)
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchSuppliers()
  }, [fetchSuppliers])

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este fornecedor?")) return

    try {
      const response = await fetch(`/api/suppliers/${id}`, { method: "DELETE" })
      if (response.ok) {
        setSuppliers((prev) => prev.filter((s) => s.id !== id))
      }
    } catch (error) {
      console.error("Error deleting supplier:", error)
    }
  }

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Nome",
      "País",
      "Categoria",
      "Risco",
      "Score",
      "Compliance",
      "Spend T12",
    ]
    const rows = suppliers.map((s) => [
      s.id,
      s.name,
      s.country,
      s.category,
      s.riskLevel,
      s.riskScore,
      s.complianceStatus,
      s.spendT12,
    ])

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "fornecedores.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie e monitore seus fornecedores
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
          <Link href="/fornecedores/novo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Fornecedor
            </Button>
          </Link>
        </div>
      </div>

      <SupplierFilters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <SuppliersTable suppliers={suppliers} onDelete={handleDelete} />
      )}
    </div>
  )
}
