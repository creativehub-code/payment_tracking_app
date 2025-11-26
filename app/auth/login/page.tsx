"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "client">("client")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isAuthenticated) return
    router.push("/")
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email || !password) {
        setError("Please fill in all fields")
        setIsLoading(false)
        return
      }

      const result = await login(email, password, role)

      if (!result.success) {
        setError(result.error || "Login failed")
        setIsLoading(false)
        return
      }

      router.push("/")
    } catch (err) {
      setError("Login failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">welcome back to MAHRINU ORU KARUTHAL</h1>
          <p className="text-muted">powred by AL MANSAH</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-muted-background/30 border border-muted/30 rounded-lg p-6 space-y-4"
        >
          {error && (
            <div className="bg-destructive/20 text-destructive border border-destructive/30 rounded p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded bg-background border border-muted/30 text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded bg-background border border-muted/30 text-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Login As</label>
            <div className="flex gap-4">
              {["admin", "client"].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value as "admin" | "client")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground capitalize">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="text-xs text-muted text-center mt-4 space-y-1">
            <p>
              
            </p>
            <p>
              <strong>Client:</strong> Must be registered by admin first
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
