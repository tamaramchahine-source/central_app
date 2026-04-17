"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import type { Supplier } from "@/lib/types"

interface SupplierFormProps {
  supplier?: Supplier
  isEditing?: boolean
}

const countries = [
  "Brasil",
  "Estados Unidos",
  "Alemanha",
  "China",
  "México",
  "Suécia",
  "Índia",
]

const categories = [
  "Matéria Prima",
  "Tecnologia",
  "Logística",
  "Manufatura",
  "Serviços",
  "Autopeças",
  "Equipamentos",
]

const complianceStatuses = [
  { value: "compliant", label: "Conforme" },
  { value: "pending", label: "Pendente" },
  { value: "non_compliant", label: "Não conforme" },
]

export function SupplierForm({ supplier, isEditing }: SupplierFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: supplier?.name || "",
    country: supplier?.country || "",
    category: supplier?.category || "",
    complianceStatus: supplier?.complianceStatus || "pending",
    riskScore: supplier?.riskScore || 50,
    spendT6: supplier?.spendT6 || 0,
    spendT12: supplier?.spendT12 || 0,
    lastAuditDate: supplier?.lastAuditDate || "",
    contractEndDate: supplier?.contractEndDate || "",
    contactEmail: supplier?.contactEmail || "",
    contactPhone: supplier?.contactPhone || "",
    notes: supplier?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const url = isEditing ? `/api/suppliers/${supplier?.id}` : "/api/suppliers"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao salvar fornecedor")
      }

      router.push("/fornecedores")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Nome do Fornecedor *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País *</Label>
              <Select
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risco e Compliance</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="riskScore">Score de Risco (0-100)</Label>
              <Input
                id="riskScore"
                type="number"
                min={0}
                max={100}
                value={formData.riskScore}
                onChange={(e) =>
                  setFormData({ ...formData, riskScore: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complianceStatus">Status de Compliance</Label>
              <Select
                id="complianceStatus"
                value={formData.complianceStatus}
                onChange={(e) =>
                  setFormData({ ...formData, complianceStatus: e.target.value as "compliant" | "pending" | "non_compliant" })
                }
              >
                {complianceStatuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastAuditDate">Última Auditoria</Label>
              <Input
                id="lastAuditDate"
                type="date"
                value={formData.lastAuditDate}
                onChange={(e) =>
                  setFormData({ ...formData, lastAuditDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractEndDate">Fim do Contrato</Label>
              <Input
                id="contractEndDate"
                type="date"
                value={formData.contractEndDate}
                onChange={(e) =>
                  setFormData({ ...formData, contractEndDate: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="spendT6">Spend T6 (USD)</Label>
              <Input
                id="spendT6"
                type="number"
                min={0}
                value={formData.spendT6}
                onChange={(e) =>
                  setFormData({ ...formData, spendT6: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spendT12">Spend T12 (USD)</Label>
              <Input
                id="spendT12"
                type="number"
                min={0}
                value={formData.spendT12}
                onChange={(e) =>
                  setFormData({ ...formData, spendT12: Number(e.target.value) })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Telefone</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Observações</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : isEditing ? (
              "Atualizar Fornecedor"
            ) : (
              "Criar Fornecedor"
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
