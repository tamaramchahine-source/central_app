import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { SessionProvider } from "@/components/providers/session-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header user={session.user} />
          <main className="flex-1 overflow-auto bg-background p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
