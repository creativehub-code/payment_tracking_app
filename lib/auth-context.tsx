"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, UserRole } from "./types"

interface RegisteredClient {
  id: string
  email: string
  password: string
  name: string
  createdAt: string
  createdBy: string
  targetAmount: number
  remainingAmount: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  addClient: (
    email: string,
    password: string,
    name: string,
    targetAmount: number,
  ) => { success: boolean; error?: string }
  getClients: () => RegisteredClient[]
  deleteClient: (clientId: string) => void
  updateClientTarget: (clientId: string, targetAmount: number) => void
  decrementClientRemaining: (clientId: string, amount: number) => void
  getClientById: (clientId: string) => RegisteredClient | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const CLIENTS_KEY = "paymentTracker_clients"
const ADMIN_CREDENTIALS = { email: "admin@payment.com", password: "admin123" }

function getStoredClients(): RegisteredClient[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(CLIENTS_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveClients(clients: RegisteredClient[]) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("paymentTracker_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("[v0] Failed to parse stored user:", error)
        localStorage.removeItem("paymentTracker_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    const normEmail = email.trim().toLowerCase()
    const normPassword = password.trim()
    // Admin login validation
    if (role === "admin") {
      if (normEmail !== ADMIN_CREDENTIALS.email || normPassword !== ADMIN_CREDENTIALS.password) {
        return { success: false, error: "Invalid admin credentials. Use admin@payment.com / admin123" }
      }
      const adminUser: User = {
        id: "admin_1",
        email,
        name: "Admin",
        role: "admin",
        createdAt: new Date().toISOString(),
      }
      setUser(adminUser)
      localStorage.setItem("paymentTracker_user", JSON.stringify(adminUser))
      return { success: true }
    }

    // Client login - must be registered by admin
    const clients = getStoredClients()
    const client = clients.find((c) => c.email.trim().toLowerCase() === normEmail && c.password === normPassword)

    if (!client) {
      return { success: false, error: "Invalid credentials. Please contact admin for account access." }
    }

    const clientUser: User = {
      id: client.id,
      email: client.email,
      name: client.name,
      role: "client",
      createdAt: client.createdAt,
    }
    setUser(clientUser)
    localStorage.setItem("paymentTracker_user", JSON.stringify(clientUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("paymentTracker_user")
  }

  const addClient = (
    email: string,
    password: string,
    name: string,
    targetAmount: number,
  ): { success: boolean; error?: string } => {
    const clients = getStoredClients()

    if (clients.some((c) => c.email === email)) {
      return { success: false, error: "Client with this email already exists" }
    }

    const newClient: RegisteredClient = {
      id: `client_${Date.now()}`,
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
      createdBy: user?.id || "admin",
      targetAmount: targetAmount,
      remainingAmount: targetAmount,
    }

    saveClients([...clients, newClient])
    return { success: true }
  }

  const getClients = (): RegisteredClient[] => {
    return getStoredClients()
  }

  const deleteClient = (clientId: string) => {
    const clients = getStoredClients()
    saveClients(clients.filter((c) => c.id !== clientId))
  }

  const updateClientTarget = (clientId: string, targetAmount: number) => {
    const clients = getStoredClients()
    const updatedClients = clients.map((c) => {
      if (c.id === clientId) {
        const approvedSoFar = c.targetAmount - c.remainingAmount
        return {
          ...c,
          targetAmount: targetAmount,
          remainingAmount: Math.max(0, targetAmount - approvedSoFar),
        }
      }
      return c
    })
    saveClients(updatedClients)
  }

  const decrementClientRemaining = (clientId: string, amount: number) => {
    const clients = getStoredClients()
    const updatedClients = clients.map((c) => {
      if (c.id === clientId) {
        return {
          ...c,
          remainingAmount: Math.max(0, c.remainingAmount - amount),
        }
      }
      return c
    })
    saveClients(updatedClients)
  }

  const getClientById = (clientId: string): RegisteredClient | undefined => {
    const clients = getStoredClients()
    return clients.find((c) => c.id === clientId)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        addClient,
        getClients,
        deleteClient,
        updateClientTarget,
        decrementClientRemaining,
        getClientById,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
