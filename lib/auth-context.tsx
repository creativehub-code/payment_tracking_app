"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { auth as firebaseAuth, db as firebaseDb } from "./firebase/config"
import { doc, setDoc } from "firebase/firestore"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth"
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
    id?: string,
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
    // If Firebase Auth is configured, use it; otherwise fall back to localStorage
    if (firebaseAuth) {
      const unsub = onAuthStateChanged(firebaseAuth, (fbUser) => {
        if (fbUser) {
          const u: User = {
            id: fbUser.uid,
            email: fbUser.email || "",
            name: fbUser.displayName || fbUser.email || "",
            role: fbUser.email === ADMIN_CREDENTIALS.email ? "admin" : "client",
            createdAt: fbUser.metadata ? new Date(fbUser.metadata.creationTime || Date.now()).toISOString() : new Date().toISOString(),
          }
          setUser(u)
          try {
            localStorage.setItem("paymentTracker_user", JSON.stringify(u))
          } catch (e) {
            // ignore
          }
        } else {
          // no user signed in
          setUser(null)
          try {
            localStorage.removeItem("paymentTracker_user")
          } catch (e) {
            // ignore
          }
        }
        setIsLoading(false)
      })
      return () => unsub()
    }

    // fallback: read from localStorage when Firebase isn't configured
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
    // If Firebase Auth is configured, sign in via Firebase
    if (firebaseAuth) {
      try {
        const cred = await signInWithEmailAndPassword(firebaseAuth, normEmail, normPassword)
        const fbUser = cred.user
        const u: User = {
          id: fbUser.uid,
          email: fbUser.email || normEmail,
          name: fbUser.displayName || fbUser.email || normEmail,
          role: fbUser.email === ADMIN_CREDENTIALS.email ? "admin" : "client",
          createdAt: fbUser.metadata ? new Date(fbUser.metadata.creationTime || Date.now()).toISOString() : new Date().toISOString(),
        }
        setUser(u)
        try {
          localStorage.setItem("paymentTracker_user", JSON.stringify(u))
        } catch (e) {
          // ignore
        }
        return { success: true }
      } catch (error: any) {
        const message = error?.message || "Failed to sign in"
        return { success: false, error: message }
      }
    }

    // Fallback localStorage-based auth (admin + registered clients)
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
    if (firebaseAuth) {
      try {
        firebaseSignOut(firebaseAuth)
      } catch (e) {
        // ignore
      }
    }
    setUser(null)
    localStorage.removeItem("paymentTracker_user")
  }

  const addClient = (
    email: string,
    password: string,
    name: string,
    targetAmount: number,
    id?: string,
  ): { success: boolean; error?: string } => {
    const clients = getStoredClients()

    if (clients.some((c) => c.email === email)) {
      return { success: false, error: "Client with this email already exists" }
    }
    const newClient: RegisteredClient = {
      id: id || `client_${Date.now()}`,
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
      createdBy: user?.id || "admin",
      targetAmount: targetAmount,
      remainingAmount: targetAmount,
    }

    // If Firestore is configured, persist a clients/{id} document as well
    if (firebaseDb) {
      try {
        const clientRef = doc(firebaseDb, "clients", newClient.id)
        // store client data without password for security
        const { password: _pw, ...clientSafe } = newClient as any
        setDoc(clientRef, clientSafe)
      } catch (err) {
        console.error("Failed to write client to Firestore:", err)
        // still fall back to localStorage
      }
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
