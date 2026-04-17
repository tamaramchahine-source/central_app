import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SupplierForm } from "@/components/suppliers/supplier-form"
import { ArrowLeft } from "lucide-react"

export default function NovoFornecedorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/fornecedores">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Fornecedor</h1>
          <p className="text-muted-foreground">
            Preencha os dados para cadastrar um novo fornecedor
          </p>
        </div>
      </div>

      <SupplierForm />
    </div>
  )
}
