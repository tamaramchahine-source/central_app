import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function getRiskColor(risk: string): string {
  switch (risk.toLowerCase()) {
    case "low":
      return "text-emerald-600 bg-emerald-50"
    case "medium":
      return "text-amber-600 bg-amber-50"
    case "high":
      return "text-red-600 bg-red-50"
    default:
      return "text-muted-foreground bg-muted"
  }
}

export function getRiskLabel(risk: string): string {
  switch (risk.toLowerCase()) {
    case "low":
      return "Baixo"
    case "medium":
      return "Médio"
    case "high":
      return "Alto"
    default:
      return risk
  }
}
