"use client"

import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import type { SupplierFilters } from "@/lib/types"

interface SupplierFiltersProps {
  filters: SupplierFilters
  onChange: (filters: SupplierFilters) => void
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

const riskLevels = [
  { value: "low", label: "Baixo" },
  { value: "medium", label: "Médio" },
  { value: "high", label: "Alto" },
]

export function SupplierFilters({ filters, onChange }: SupplierFiltersProps) {
  const hasFilters = Object.values(filters).some((v) => v)

  const clearFilters = () => {
    onChange({})
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome ou ID..."
          value={filters.search || ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9"
        />
      </div>
      <Select
        value={filters.country || ""}
        onChange={(e) =>
          onChange({ ...filters, country: e.target.value || undefined })
        }
      >
        <option value="">Todos os países</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </Select>
      <Select
        value={filters.category || ""}
        onChange={(e) =>
          onChange({ ...filters, category: e.target.value || undefined })
        }
      >
        <option value="">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Select
        value={filters.riskLevel || ""}
        onChange={(e) =>
          onChange({ ...filters, riskLevel: e.target.value || undefined })
        }
      >
        <option value="">Todos os riscos</option>
        {riskLevels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </Select>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  )
}
