import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { mockSuppliers } from "@/lib/mock-data"
import type { Supplier } from "@/lib/types"

// In-memory storage (will be replaced by BigQuery)
let suppliers = [...mockSuppliers]

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id } = await params
  const supplier = suppliers.find((s) => s.id === id)

  if (!supplier) {
    return NextResponse.json({ error: "Fornecedor não encontrado" }, { status: 404 })
  }

  return NextResponse.json({ supplier })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id } = await params
  const index = suppliers.findIndex((s) => s.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Fornecedor não encontrado" }, { status: 404 })
  }

  try {
    const data = await request.json()

    const updatedSupplier: Supplier = {
      ...suppliers[index],
      ...data,
      riskLevel: getRiskLevel(data.riskScore || suppliers[index].riskScore),
      updatedAt: new Date().toISOString(),
    }

    suppliers[index] = updatedSupplier

    return NextResponse.json({ supplier: updatedSupplier })
  } catch (error) {
    console.error("Error updating supplier:", error)
    return NextResponse.json({ error: "Erro ao atualizar fornecedor" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id } = await params
  const index = suppliers.findIndex((s) => s.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Fornecedor não encontrado" }, { status: 404 })
  }

  suppliers = suppliers.filter((s) => s.id !== id)

  return NextResponse.json({ message: "Fornecedor excluído com sucesso" })
}

function getRiskLevel(score: number): "low" | "medium" | "high" {
  if (score <= 33) return "low"
  if (score <= 66) return "medium"
  return "high"
}
