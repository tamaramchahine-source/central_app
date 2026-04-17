"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { isBigQueryConfigured } from "@/lib/bigquery"
import { Database, Key, Bell, Shield, CheckCircle, XCircle } from "lucide-react"

export default function ConfiguracoesPage() {
  const bigQueryConfigured = isBigQueryConfigured()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Conexão BigQuery</CardTitle>
                  <CardDescription>
                    Configure a conexão com o Google BigQuery
                  </CardDescription>
                </div>
              </div>
              <Badge variant={bigQueryConfigured ? "success" : "destructive"}>
                {bigQueryConfigured ? (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Conectado
                  </>
                ) : (
                  <>
                    <XCircle className="mr-1 h-3 w-3" />
                    Não configurado
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gcpProject">GCP Project ID</Label>
                <Input
                  id="gcpProject"
                  placeholder="seu-projeto-gcp"
                  defaultValue={process.env.GCP_PROJECT_ID ? "••••••••" : ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gcpDataset">Dataset</Label>
                <Input
                  id="gcpDataset"
                  placeholder="srm_data"
                  defaultValue={process.env.GCP_DATASET || "srm_data"}
                  disabled
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Configure as variáveis de ambiente GCP_PROJECT_ID e GCP_CREDENTIALS
              para conectar ao BigQuery.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Autenticação</CardTitle>
                <CardDescription>
                  Configurações de autenticação do sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nextauthSecret">NextAuth Secret</Label>
              <Input
                id="nextauthSecret"
                type="password"
                placeholder="••••••••••••••••"
                disabled
              />
            </div>
            <p className="text-sm text-muted-foreground">
              A chave de autenticação é configurada via variável de ambiente NEXTAUTH_SECRET.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Configure alertas e notificações do sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Alertas de Alto Risco</p>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações quando um fornecedor atingir alto risco
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Vencimento de Contratos</p>
                  <p className="text-sm text-muted-foreground">
                    Alertas de contratos próximos do vencimento
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Configurações de segurança e permissões
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Sessões Ativas</p>
                  <p className="text-sm text-muted-foreground">
                    Gerencie as sessões ativas dos usuários
                  </p>
                </div>
                <Button variant="outline">Gerenciar</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Logs de Auditoria</p>
                  <p className="text-sm text-muted-foreground">
                    Visualize os logs de ações dos usuários
                  </p>
                </div>
                <Button variant="outline">Visualizar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
