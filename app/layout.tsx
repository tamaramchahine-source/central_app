import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains"
})

export const metadata: Metadata = {
  title: "SRM Dashboard - Gestão de Fornecedores",
  description: "Plataforma completa para gestão de fornecedores com análise de risco, compliance e spend",
}

export const viewport: Viewport = {
  themeColor: "#0066ff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
