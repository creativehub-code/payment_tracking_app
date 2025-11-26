"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import NotificationsBell from "@/components/notifications-bell"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, user?.role, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-muted-background bg-muted-background/50 sticky top-0 z-40">
        <div className="px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between bg-zinc-950 font-light font-sans tabular-nums text-card">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">Payment Tracker</h1>
            <p className="text-xs sm:text-sm text-muted">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <NotificationsBell />
            <span className="hidden sm:inline text-sm text-muted">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-2 sm:px-3 py-1 rounded bg-destructive text-primary-foreground text-xs sm:text-sm hover:opacity-90"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="p-3 sm:p-6">{children}</main>
    </div>
  )
}
