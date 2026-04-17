import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"

const reports = [
  {
    id: 1,
    name: "Relatório de Risco",
    description: "Análise completa de risco de todos os fornecedores",
    icon: AlertTriangle,
    color: "text-red-600 bg-red-50",
    lastGenerated: "2024-02-15",
    type: "PDF",
  },
  {
    id: 2,
    name: "Relatório de Spend",
    description: "Detalhamento de gastos por categoria e fornecedor",
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-50",
    lastGenerated: "2024-02-14",
    type: "Excel",
  },
  {
    id: 3,
    name: "Relatório de Compliance",
    description: "Status de compliance e auditorias pendentes",
    icon: FileText,
    color: "text-primary bg-primary/10",
    lastGenerated: "2024-02-13",
    type: "PDF",
  },
  {
    id: 4,
    name: "Relatório Executivo",
    description: "Resumo gerencial com KPIs principais",
    icon: TrendingUp,
    color: "text-amber-600 bg-amber-50",
    lastGenerated: "2024-02-12",
    type: "PDF",
  },
]

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">
          Gere e baixe relatórios sobre fornecedores
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon
          return (
            <Card key={report.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${report.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {report.description}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{report.type}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Última geração: {report.lastGenerated}</span>
                  </div>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatório Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Crie um relatório personalizado selecionando os filtros e métricas desejadas.
          </p>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Criar Relatório Personalizado
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
