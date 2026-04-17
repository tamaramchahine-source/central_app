export interface Supplier {
  id: string
  name: string
  country: string
  category: string
  riskScore: number
  riskLevel: "low" | "medium" | "high"
  complianceStatus: "compliant" | "pending" | "non_compliant"
  spendT6: number
  spendT12: number
  lastAuditDate: string
  contractEndDate: string
  contactEmail: string
  contactPhone: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface SupplierFilters {
  search?: string
  country?: string
  category?: string
  riskLevel?: string
  complianceStatus?: string
  period?: "T6" | "T12"
}

export interface DashboardStats {
  totalSuppliers: number
  totalSpend: number
  avgRiskScore: number
  complianceRate: number
  highRiskCount: number
  pendingAudits: number
}

export interface SpendByCategory {
  category: string
  spend: number
  percentage: number
}

export interface SpendByCountry {
  country: string
  spend: number
  supplierCount: number
}

export interface RiskDistribution {
  level: string
  count: number
  percentage: number
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "viewer"
  password: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}
