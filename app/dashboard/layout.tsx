import type React from "react"
import Link from "next/link"
import { Home, Layers, Users } from "lucide-react"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import UserButton from "@/components/auth/user-button"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="font-bold">
            Portfolio Dashboard
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/users" className="text-sm font-medium">
              Users
            </Link>
            <Link href="/dashboard/technologies" className="text-sm font-medium">
              Technologies
            </Link>
            <UserButton />
          </nav>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="w-64 border-r bg-muted/40 p-4 hidden md:block">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/dashboard/technologies"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted"
            >
              <Layers className="h-4 w-4" />
              Technologies
            </Link>
          </nav>
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
