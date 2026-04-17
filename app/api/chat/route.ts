import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
  tool,
} from "ai"
import { z } from "zod"
import { mockSuppliers, mockDashboardStats } from "@/lib/mock-data"

export const maxDuration = 30

const systemPrompt = `Você é um assistente especializado em gestão de fornecedores (SRM - Supplier Relationship Management).
Você ajuda usuários a analisar dados de fornecedores, entender riscos, compliance e spend.

Contexto atual do sistema:
- Total de fornecedores: ${mockDashboardStats.totalSuppliers}
- Spend total (T12): ${mockDashboardStats.totalSpend.toLocaleString("pt-BR", { style: "currency", currency: "USD" })}
- Taxa de compliance: ${mockDashboardStats.complianceRate}%
- Fornecedores de alto risco: ${mockDashboardStats.highRiskCount}
- Score médio de risco: ${mockDashboardStats.avgRiskScore}

Você pode usar as ferramentas disponíveis para buscar informações específicas sobre fornecedores.
Responda sempre em português brasileiro de forma profissional e objetiva.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-5-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    tools: {
      searchSuppliers: tool({
        description: "Busca fornecedores por nome, país ou categoria",
        inputSchema: z.object({
          query: z.string().describe("Termo de busca"),
          field: z.enum(["name", "country", "category"]).describe("Campo para buscar"),
        }),
        execute: async ({ query, field }) => {
          const filtered = mockSuppliers.filter((s) =>
            s[field].toLowerCase().includes(query.toLowerCase())
          )
          return filtered.map((s) => ({
            id: s.id,
            name: s.name,
            country: s.country,
            category: s.category,
            riskLevel: s.riskLevel,
            riskScore: s.riskScore,
            spendT12: s.spendT12,
          }))
        },
      }),
      getSupplierDetails: tool({
        description: "Obtém detalhes completos de um fornecedor específico",
        inputSchema: z.object({
          supplierId: z.string().describe("ID do fornecedor (ex: SUP001)"),
        }),
        execute: async ({ supplierId }) => {
          const supplier = mockSuppliers.find((s) => s.id === supplierId)
          if (!supplier) return { error: "Fornecedor não encontrado" }
          return supplier
        },
      }),
      getHighRiskSuppliers: tool({
        description: "Lista fornecedores com alto risco",
        inputSchema: z.object({}),
        execute: async () => {
          return mockSuppliers
            .filter((s) => s.riskLevel === "high")
            .map((s) => ({
              id: s.id,
              name: s.name,
              riskScore: s.riskScore,
              complianceStatus: s.complianceStatus,
              spendT12: s.spendT12,
            }))
        },
      }),
      getSpendAnalysis: tool({
        description: "Analisa o spend por categoria ou país",
        inputSchema: z.object({
          groupBy: z.enum(["category", "country"]).describe("Agrupar por categoria ou país"),
        }),
        execute: async ({ groupBy }) => {
          const grouped = mockSuppliers.reduce(
            (acc, s) => {
              const key = s[groupBy]
              if (!acc[key]) acc[key] = { total: 0, count: 0 }
              acc[key].total += s.spendT12
              acc[key].count++
              return acc
            },
            {} as Record<string, { total: number; count: number }>
          )
          return Object.entries(grouped).map(([key, value]) => ({
            [groupBy]: key,
            totalSpend: value.total,
            supplierCount: value.count,
          }))
        },
      }),
    },
    maxSteps: 5,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
