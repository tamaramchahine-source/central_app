"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react"

const suggestions = [
  "Quais são os fornecedores de alto risco?",
  "Analise o spend por categoria",
  "Liste fornecedores do Brasil",
  "Qual é o status geral de compliance?",
]

export default function ChatPage() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestion = (suggestion: string) => {
    sendMessage({ text: suggestion })
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Chat AI</h1>
        <p className="text-muted-foreground">
          Converse com o assistente para analisar dados de fornecedores
        </p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mb-2 text-xl font-semibold">
                  Bem-vindo ao Chat AI
                </h2>
                <p className="mb-6 max-w-md text-muted-foreground">
                  Faça perguntas sobre seus fornecedores, analise riscos, spend
                  e compliance de forma inteligente.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-sm"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <p
                              key={index}
                              className="whitespace-pre-wrap text-sm"
                            >
                              {part.text}
                            </p>
                          )
                        }
                        if (part.type === "tool-invocation") {
                          return (
                            <div
                              key={index}
                              className="my-2 rounded border border-border bg-background p-2 text-xs"
                            >
                              <p className="font-medium text-muted-foreground">
                                Buscando: {part.toolInvocation.toolName}
                              </p>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-secondary">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Pensando...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-border p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta sobre fornecedores..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
