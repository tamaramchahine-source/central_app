import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SupplierForm } from "@/components/suppliers/supplier-form"
import { ArrowLeft } from "lucide-react"
import { mockSuppliers } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditarFornecedorPage({ params }: PageProps) {
  const { id } = await params
  const supplier = mockSuppliers.find((s) => s.id === id)

  if (!supplier) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/fornecedores/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Fornecedor</h1>
          <p className="text-muted-foreground">
            {supplier.name} - {supplier.id}
          </p>
        </div>
      </div>

      <SupplierForm supplier={supplier} isEditing />
    </div>
  )
}
