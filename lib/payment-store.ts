import type { Payment, Client, MonthlyAggregate, ClientSummary } from "./types"
import { IS_FIREBASE_ENABLED } from "./config"
import * as firebasePayments from "./firebase/payments"

const STORAGE_KEY = "paymentTracker_payments"
const CLIENTS_STORAGE_KEY = "paymentTracker_clients"

// localStorage implementations
function getPaymentsLocal(): Payment[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function savePaymentLocal(payment: Payment): void {
  if (typeof window === "undefined") return
  const payments = getPaymentsLocal()
  const existing = payments.findIndex((p) => p.id === payment.id)
  if (existing >= 0) {
    payments[existing] = payment
  } else {
    payments.push(payment)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments))
}

function deletePaymentLocal(id: string): void {
  if (typeof window === "undefined") return
  const payments = getPaymentsLocal().filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments))
}

// Unified API - uses Firebase if enabled, otherwise localStorage
export async function getPayments(): Promise<Payment[]> {
  if (IS_FIREBASE_ENABLED) {
    return await firebasePayments.getPayments()
  }
  return getPaymentsLocal()
}

// For backward compatibility, provide sync version that returns empty array if Firebase is enabled
export function getPaymentsSync(): Payment[] {
  if (!IS_FIREBASE_ENABLED) {
    return getPaymentsLocal()
  }
  return [] // Firebase is async, so return empty for sync calls
}

export async function savePayment(payment: Payment): Promise<void> {
  if (IS_FIREBASE_ENABLED) {
    await firebasePayments.savePayment(payment)
  } else {
    savePaymentLocal(payment)
  }
}

export async function deletePayment(id: string): Promise<void> {
  if (IS_FIREBASE_ENABLED) {
    await firebasePayments.deletePayment(id)
  } else {
    deletePaymentLocal(id)
  }
}

export async function getPaymentsByClient(clientId: string): Promise<Payment[]> {
  if (IS_FIREBASE_ENABLED) {
    return await firebasePayments.getPaymentsByClient(clientId)
  }
  return getPaymentsLocal().filter((p) => p.clientId === clientId)
}

export function getPaymentsByClientSync(clientId: string): Payment[] {
  if (!IS_FIREBASE_ENABLED) {
    return getPaymentsLocal().filter((p) => p.clientId === clientId)
  }
  return []
}

export async function getPaymentsByStatus(status: Payment["status"]): Promise<Payment[]> {
  if (IS_FIREBASE_ENABLED) {
    return await firebasePayments.getPaymentsByStatus(status)
  }
  return getPaymentsLocal().filter((p) => p.status === status)
}

export function getClientByPayment(payment: Payment): Client | null {
  const stored = localStorage.getItem(CLIENTS_STORAGE_KEY)
  if (!stored) {
    // Generate a default client
    return {
      id: payment.clientId,
      name: `Client ${payment.clientId.slice(0, 8)}`,
      targetAmount: 10000,
    }
  }
  const clients: Client[] = JSON.parse(stored)
  return clients.find((c) => c.id === payment.clientId) || null
}

export function getClientsStore(): Client[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(CLIENTS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export async function getMonthlyAggregates(clientId: string): Promise<MonthlyAggregate[]> {
  if (IS_FIREBASE_ENABLED) {
    return await firebasePayments.getMonthlyAggregates(clientId)
  }

  const payments = await getPaymentsByClient(clientId)
  const approvedPayments = payments.filter((p) => p.status === "approved")

  const monthMap = new Map<string, Payment[]>()

  approvedPayments.forEach((payment) => {
    const date = new Date(payment.approvedAt || payment.submittedAt)
    const month = date.toISOString().slice(0, 7) // YYYY-MM format

    if (!monthMap.has(month)) {
      monthMap.set(month, [])
    }
    monthMap.get(month)!.push(payment)
  })

  return Array.from(monthMap.entries())
    .map(([month, monthPayments]) => ({
      month,
      amount: monthPayments.reduce((sum, p) => sum + p.amount, 0),
      payments: monthPayments,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

// Sync version for backward compatibility
export function getMonthlyAggregatesSync(clientId: string): MonthlyAggregate[] {
  if (IS_FIREBASE_ENABLED) {
    return [] // Firebase is async
  }

  const payments = getPaymentsByClientSync(clientId).filter((p) => p.status === "approved")
  const monthMap = new Map<string, Payment[]>()

  payments.forEach((payment) => {
    const date = new Date(payment.approvedAt || payment.submittedAt)
    const month = date.toISOString().slice(0, 7)

    if (!monthMap.has(month)) {
      monthMap.set(month, [])
    }
    monthMap.get(month)!.push(payment)
  })

  return Array.from(monthMap.entries())
    .map(([month, monthPayments]) => ({
      month,
      amount: monthPayments.reduce((sum, p) => sum + p.amount, 0),
      payments: monthPayments,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

export async function getClientSummary(clientId: string): Promise<ClientSummary> {
  const client = getClientByPayment({ clientId } as Payment) || { id: clientId, name: "Unknown", targetAmount: 10000 }
  const payments = await getPaymentsByClient(clientId)
  const approvedPayments = payments.filter((p) => p.status === "approved")
  const totalApproved = approvedPayments.reduce((sum, p) => sum + p.amount, 0)

  const monthlyData = await getMonthlyAggregates(clientId)
  let cumulativeTotal = 0
  let targetReachedMonth: string | undefined

  for (const monthly of monthlyData) {
    cumulativeTotal += monthly.amount
    if (cumulativeTotal >= client.targetAmount && !targetReachedMonth) {
      targetReachedMonth = monthly.month
    }
  }

  return {
    targetAmount: client.targetAmount,
    totalApproved,
    remaining: Math.max(0, client.targetAmount - totalApproved),
    targetReachedMonth,
  }
}

// Sync version for backward compatibility (only works with localStorage)
export function getClientSummarySync(clientId: string): ClientSummary {
  if (IS_FIREBASE_ENABLED) {
    // Return default values if Firebase is enabled (async version should be used)
    return {
      targetAmount: 0,
      totalApproved: 0,
      remaining: 0,
    }
  }

  const client = getClientByPayment({ clientId } as Payment) || { id: clientId, name: "Unknown", targetAmount: 10000 }
  const payments = getPaymentsByClientSync(clientId).filter((p) => p.status === "approved")
  const totalApproved = payments.reduce((sum, p) => sum + p.amount, 0)

  const monthlyData = getMonthlyAggregatesSync(clientId)
  let cumulativeTotal = 0
  let targetReachedMonth: string | undefined

  for (const monthly of monthlyData) {
    cumulativeTotal += monthly.amount
    if (cumulativeTotal >= client.targetAmount && !targetReachedMonth) {
      targetReachedMonth = monthly.month
    }
  }

  return {
    targetAmount: client.targetAmount,
    totalApproved,
    remaining: Math.max(0, client.targetAmount - totalApproved),
    targetReachedMonth,
  }
}

export async function getPaymentsByMonthAndClient(clientId: string, month: string): Promise<Payment[]> {
  if (IS_FIREBASE_ENABLED) {
    return await firebasePayments.getPaymentsByMonthAndClient(clientId, month)
  }

  const payments = await getPaymentsByClient(clientId)
  return payments
    .filter((p) => p.status === "approved")
    .filter((p) => {
      const date = new Date(p.approvedAt || p.submittedAt)
      return date.toISOString().slice(0, 7) === month
    })
}

// Export Firebase subscription function
export function subscribeToPayments(
  callback: (payments: Payment[]) => void,
  clientId?: string,
  status?: Payment["status"],
): () => void {
  if (IS_FIREBASE_ENABLED) {
    return firebasePayments.subscribeToPayments(callback, clientId, status)
  }
  // For localStorage, just call callback with current data
  getPayments().then((payments) => {
    let filtered = payments
    if (clientId) filtered = filtered.filter((p) => p.clientId === clientId)
    if (status) filtered = filtered.filter((p) => p.status === status)
    callback(filtered)
  })
  return () => {} // Return empty unsubscribe function
}
