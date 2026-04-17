import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mockSuppliers } from "@/lib/mock-data"
import type { Supplier } from "@/lib/types"

// In-memory storage (will be replaced by BigQuery)
let suppliers = [...mockSuppliers]

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")?.toLowerCase()
  const country = searchParams.get("country")
  const category = searchParams.get("category")
  const riskLevel = searchParams.get("riskLevel")

  let filtered = [...suppliers]

  if (search) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.id.toLowerCase().includes(search)
    )
  }
  if (country) {
    filtered = filtered.filter((s) => s.country === country)
  }
  if (category) {
    filtered = filtered.filter((s) => s.category === category)
  }
  if (riskLevel) {
    filtered = filtered.filter((s) => s.riskLevel === riskLevel)
  }

  return NextResponse.json({ suppliers: filtered, total: filtered.length })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const newSupplier: Supplier = {
      id: `SUP${String(suppliers.length + 1).padStart(3, "0")}`,
      ...data,
      riskScore: data.riskScore || 50,
      riskLevel: getRiskLevel(data.riskScore || 50),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    suppliers.push(newSupplier)

    return NextResponse.json({ supplier: newSupplier }, { status: 201 })
  } catch (error) {
    console.error("Error creating supplier:", error)
    return NextResponse.json({ error: "Erro ao criar fornecedor" }, { status: 500 })
  }
}

function getRiskLevel(score: number): "low" | "medium" | "high" {
  if (score <= 33) return "low"
  if (score <= 66) return "medium"
  return "high"
}
