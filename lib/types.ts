export type UserRole = "admin" | "client"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

export interface Payment {
  id: string
  clientId: string
  amount: number
  description: string
  proofUrl?: string
  ocrAmount?: number
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  adminNotes?: string
  approvedAt?: string
  approvedBy?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface Client {
  id: string
  name: string
  targetAmount: number
}

export interface MonthlyAggregate {
  month: string // YYYY-MM format
  amount: number
  payments: Payment[]
}

export interface ClientSummary {
  targetAmount: number
  totalApproved: number
  remaining: number
  targetReachedMonth?: string
}
