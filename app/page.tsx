"use client"

import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (user?.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/client/portal")
        }
      } else {
        router.push("/auth/login")
      }
    }
  }, [isAuthenticated, isLoading, user?.role, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    )
  }

  return null
}
