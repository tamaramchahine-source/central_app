import { BigQuery } from "@google-cloud/bigquery"
import type { Supplier, DashboardStats, SpendByCategory, SpendByCountry } from "./types"

// BigQuery client initialization
// Requires: GCP_PROJECT_ID and GCP_CREDENTIALS environment variables
let bigqueryClient: BigQuery | null = null

function getBigQueryClient(): BigQuery {
  if (!bigqueryClient) {
    const projectId = process.env.GCP_PROJECT_ID
    const credentials = process.env.GCP_CREDENTIALS

    if (!projectId || !credentials) {
      throw new Error("BigQuery credentials not configured. Set GCP_PROJECT_ID and GCP_CREDENTIALS environment variables.")
    }

    bigqueryClient = new BigQuery({
      projectId,
      credentials: JSON.parse(credentials),
    })
  }
  return bigqueryClient
}

// Check if BigQuery is configured
export function isBigQueryConfigured(): boolean {
  return !!(process.env.GCP_PROJECT_ID && process.env.GCP_CREDENTIALS)
}

// Fetch suppliers from BigQuery
export async function fetchSuppliers(filters?: {
  search?: string
  country?: string
  category?: string
  riskLevel?: string
}): Promise<Supplier[]> {
  const client = getBigQueryClient()
  const dataset = process.env.GCP_DATASET || "srm_data"
  const table = process.env.GCP_SUPPLIERS_TABLE || "suppliers"

  let query = `
    SELECT 
      id,
      name,
      country,
      category,
      risk_score as riskScore,
      CASE 
        WHEN risk_score <= 33 THEN 'low'
        WHEN risk_score <= 66 THEN 'medium'
        ELSE 'high'
      END as riskLevel,
      compliance_status as complianceStatus,
      spend_t6 as spendT6,
      spend_t12 as spendT12,
      last_audit_date as lastAuditDate,
      contract_end_date as contractEndDate,
      contact_email as contactEmail,
      contact_phone as contactPhone,
      notes,
      created_at as createdAt,
      updated_at as updatedAt
    FROM \`${dataset}.${table}\`
    WHERE 1=1
  `

  const params: Record<string, string> = {}

  if (filters?.search) {
    query += ` AND (LOWER(name) LIKE @search OR LOWER(id) LIKE @search)`
    params.search = `%${filters.search.toLowerCase()}%`
  }
  if (filters?.country) {
    query += ` AND country = @country`
    params.country = filters.country
  }
  if (filters?.category) {
    query += ` AND category = @category`
    params.category = filters.category
  }
  if (filters?.riskLevel) {
    const scoreRanges = {
      low: "risk_score <= 33",
      medium: "risk_score > 33 AND risk_score <= 66",
      high: "risk_score > 66",
    }
    query += ` AND ${scoreRanges[filters.riskLevel as keyof typeof scoreRanges]}`
  }

  query += ` ORDER BY updated_at DESC`

  const [rows] = await client.query({ query, params })
  return rows as Supplier[]
}

// Fetch dashboard statistics
export async function fetchDashboardStats(): Promise<DashboardStats> {
  const client = getBigQueryClient()
  const dataset = process.env.GCP_DATASET || "srm_data"
  const table = process.env.GCP_SUPPLIERS_TABLE || "suppliers"

  const query = `
    SELECT 
      COUNT(*) as totalSuppliers,
      SUM(spend_t12) as totalSpend,
      AVG(risk_score) as avgRiskScore,
      COUNTIF(compliance_status = 'compliant') * 100.0 / COUNT(*) as complianceRate,
      COUNTIF(risk_score > 66) as highRiskCount,
      COUNTIF(compliance_status = 'pending') as pendingAudits
    FROM \`${dataset}.${table}\`
  `

  const [rows] = await client.query({ query })
  const row = rows[0]

  return {
    totalSuppliers: Number(row.totalSuppliers) || 0,
    totalSpend: Number(row.totalSpend) || 0,
    avgRiskScore: Math.round(Number(row.avgRiskScore) || 0),
    complianceRate: Math.round(Number(row.complianceRate) || 0),
    highRiskCount: Number(row.highRiskCount) || 0,
    pendingAudits: Number(row.pendingAudits) || 0,
  }
}

// Fetch spend by category
export async function fetchSpendByCategory(): Promise<SpendByCategory[]> {
  const client = getBigQueryClient()
  const dataset = process.env.GCP_DATASET || "srm_data"
  const table = process.env.GCP_SUPPLIERS_TABLE || "suppliers"

  const query = `
    SELECT 
      category,
      SUM(spend_t12) as spend,
      SUM(spend_t12) * 100.0 / SUM(SUM(spend_t12)) OVER() as percentage
    FROM \`${dataset}.${table}\`
    GROUP BY category
    ORDER BY spend DESC
  `

  const [rows] = await client.query({ query })
  return rows.map((row) => ({
    category: row.category,
    spend: Number(row.spend),
    percentage: Number(row.percentage),
  }))
}

// Fetch spend by country
export async function fetchSpendByCountry(): Promise<SpendByCountry[]> {
  const client = getBigQueryClient()
  const dataset = process.env.GCP_DATASET || "srm_data"
  const table = process.env.GCP_SUPPLIERS_TABLE || "suppliers"

  const query = `
    SELECT 
      country,
      SUM(spend_t12) as spend,
      COUNT(*) as supplierCount
    FROM \`${dataset}.${table}\`
    GROUP BY country
    ORDER BY spend DESC
  `

  const [rows] = await client.query({ query })
  return rows.map((row) => ({
    country: row.country,
    spend: Number(row.spend),
    supplierCount: Number(row.supplierCount),
  }))
}

// Get supplier by ID
export async function fetchSupplierById(id: string): Promise<Supplier | null> {
  const client = getBigQueryClient()
  const dataset = process.env.GCP_DATASET || "srm_data"
  const table = process.env.GCP_SUPPLIERS_TABLE || "suppliers"

  const query = `
    SELECT 
      id,
      name,
      country,
      category,
      risk_score as riskScore,
      CASE 
        WHEN risk_score <= 33 THEN 'low'
        WHEN risk_score <= 66 THEN 'medium'
        ELSE 'high'
      END as riskLevel,
      compliance_status as complianceStatus,
      spend_t6 as spendT6,
      spend_t12 as spendT12,
      last_audit_date as lastAuditDate,
      contract_end_date as contractEndDate,
      contact_email as contactEmail,
      contact_phone as contactPhone,
      notes,
      created_at as createdAt,
      updated_at as updatedAt
    FROM \`${dataset}.${table}\`
    WHERE id = @id
  `

  const [rows] = await client.query({ query, params: { id } })
  return rows[0] as Supplier | null
}
