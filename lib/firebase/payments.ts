import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  type DocumentData,
} from "firebase/firestore"
import { db } from "./config"

// Helper to check if Firebase is available
function checkFirebaseAvailable(): void {
  if (!db) {
    throw new Error("Firebase is not initialized. Please check your Firebase configuration in .env.local")
  }
}
import type { Payment, MonthlyAggregate } from "../types"

const PAYMENTS_COLLECTION = "payments"

// Convert Firestore timestamp to ISO string
const timestampToISO = (timestamp: any): string => {
  if (timestamp?.toDate) {
    return timestamp.toDate().toISOString()
  }
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toISOString()
  }
  return timestamp || new Date().toISOString()
}

// Convert Payment to Firestore document
const paymentToFirestore = (payment: Payment): DocumentData => {
  return {
    ...payment,
    submittedAt: Timestamp.fromDate(new Date(payment.submittedAt)),
    reviewedAt: payment.reviewedAt ? Timestamp.fromDate(new Date(payment.reviewedAt)) : null,
    approvedAt: payment.approvedAt ? Timestamp.fromDate(new Date(payment.approvedAt)) : null,
  }
}

// Convert Firestore document to Payment
const firestoreToPayment = (doc: DocumentData): Payment => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    submittedAt: timestampToISO(data.submittedAt),
    reviewedAt: data.reviewedAt ? timestampToISO(data.reviewedAt) : undefined,
    approvedAt: data.approvedAt ? timestampToISO(data.approvedAt) : undefined,
  } as Payment
}

export async function getPayments(): Promise<Payment[]> {
  try {
    checkFirebaseAvailable()
    const paymentsRef = collection(db!, PAYMENTS_COLLECTION)
    const q = query(paymentsRef, orderBy("submittedAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(firestoreToPayment)
  } catch (error) {
    console.error("Error getting payments:", error)
    return []
  }
}

export async function getPayment(id: string): Promise<Payment | null> {
  try {
    checkFirebaseAvailable()
    const paymentRef = doc(db!, PAYMENTS_COLLECTION, id)
    const paymentSnap = await getDoc(paymentRef)
    if (paymentSnap.exists()) {
      return firestoreToPayment(paymentSnap)
    }
    return null
  } catch (error) {
    console.error("Error getting payment:", error)
    return null
  }
}

export async function savePayment(payment: Payment): Promise<void> {
  try {
    checkFirebaseAvailable()
    if (payment.id && payment.id.startsWith("payment_")) {
      // Update existing payment
      const paymentRef = doc(db!, PAYMENTS_COLLECTION, payment.id)
      const { id, ...paymentData } = payment
      await updateDoc(paymentRef, paymentToFirestore(paymentData) as any)
    } else {
      // Create new payment
      const { id, ...paymentData } = payment
      const newId = id || `payment_${Date.now()}`
      const paymentRef = doc(db, PAYMENTS_COLLECTION, newId)
      await updateDoc(paymentRef, { ...paymentToFirestore(paymentData), id: newId } as any)
    }
    } catch (error) {
    // If update fails, try to create new document
    try {
      checkFirebaseAvailable()
      const paymentsRef = collection(db!, PAYMENTS_COLLECTION)
      const { id, ...paymentData } = payment
      const newId = id || `payment_${Date.now()}`
      await addDoc(paymentsRef, { ...paymentToFirestore(paymentData), id: newId })
    } catch (addError) {
      console.error("Error saving payment:", addError)
      throw addError
    }
  }
}

export async function deletePayment(id: string): Promise<void> {
  try {
    checkFirebaseAvailable()
    const paymentRef = doc(db!, PAYMENTS_COLLECTION, id)
    await deleteDoc(paymentRef)
  } catch (error) {
    console.error("Error deleting payment:", error)
    throw error
  }
}

export async function getPaymentsByClient(clientId: string): Promise<Payment[]> {
  try {
    checkFirebaseAvailable()
    const paymentsRef = collection(db!, PAYMENTS_COLLECTION)
    // Use where only (no orderBy) to avoid index requirement, then sort in memory
    const q = query(paymentsRef, where("clientId", "==", clientId))
    const querySnapshot = await getDocs(q)
    const payments = querySnapshot.docs.map(firestoreToPayment)
    // Sort by submittedAt descending in memory
    return payments.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  } catch (error: any) {
    console.error("Error getting payments by client:", error)
    // If it's an index error, try fallback method
    if (error?.code === "failed-precondition" && error?.message?.includes("index")) {
      console.warn("Index error detected, trying fallback method...")
      try {
        // Fallback: Get all payments and filter in memory
        const paymentsRef = collection(db!, PAYMENTS_COLLECTION)
        const querySnapshot = await getDocs(paymentsRef)
        const allPayments = querySnapshot.docs.map(firestoreToPayment)
        const filtered = allPayments.filter((p) => p.clientId === clientId)
        return filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      } catch (fallbackError) {
        console.error("Fallback method also failed:", fallbackError)
      }
    }
    return []
  }
}

export async function getPaymentsByStatus(status: Payment["status"]): Promise<Payment[]> {
  try {
    checkFirebaseAvailable()
    const paymentsRef = collection(db!, PAYMENTS_COLLECTION)
    // Use where only (no orderBy) to avoid index requirement, then sort in memory
    const q = query(paymentsRef, where("status", "==", status))
    const querySnapshot = await getDocs(q)
    const payments = querySnapshot.docs.map(firestoreToPayment)
    // Sort by submittedAt descending in memory
    return payments.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  } catch (error: any) {
    console.error("Error getting payments by status:", error)
    // If it's an index error, try fallback method
    if (error?.code === "failed-precondition" && error?.message?.includes("index")) {
      console.warn("Index error detected, trying fallback method...")
      try {
        // Fallback: Get all payments and filter in memory
        const paymentsRef = collection(db!, PAYMENTS_COLLECTION)
        const querySnapshot = await getDocs(paymentsRef)
        const allPayments = querySnapshot.docs.map(firestoreToPayment)
        const filtered = allPayments.filter((p) => p.status === status)
        return filtered.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      } catch (fallbackError) {
        console.error("Fallback method also failed:", fallbackError)
      }
    }
    return []
  }
}

export function subscribeToPayments(
  callback: (payments: Payment[]) => void,
  clientId?: string,
  status?: Payment["status"],
): () => void {
  try {
    if (!db) {
      console.warn("Firebase not initialized, subscription disabled")
      return () => {}
    }
    const paymentsRef = collection(db, PAYMENTS_COLLECTION)
    
    // Build query without orderBy to avoid index requirement
    // We'll sort in memory instead
    let q: any
    if (clientId && status) {
      // For multiple filters, we need to get all and filter in memory
      q = query(paymentsRef)
    } else if (clientId) {
      q = query(paymentsRef, where("clientId", "==", clientId))
    } else if (status) {
      q = query(paymentsRef, where("status", "==", status))
    } else {
      q = query(paymentsRef)
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        let payments = snapshot.docs.map(firestoreToPayment)
        
        // Apply filters in memory if needed
        if (clientId) {
          payments = payments.filter((p) => p.clientId === clientId)
        }
        if (status) {
          payments = payments.filter((p) => p.status === status)
        }
        
        // Sort by submittedAt descending in memory
        payments.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
        
        callback(payments)
      },
      (error: any) => {
        console.error("Error subscribing to payments:", error)
        // If it's an index error, try fallback: subscribe to all and filter in memory
        if (error?.code === "failed-precondition" && error?.message?.includes("index")) {
          console.warn("Index error in subscription, using fallback method...")
          const fallbackQ = query(paymentsRef)
          return onSnapshot(
            fallbackQ,
            (snapshot) => {
              let payments = snapshot.docs.map(firestoreToPayment)
              if (clientId) payments = payments.filter((p) => p.clientId === clientId)
              if (status) payments = payments.filter((p) => p.status === status)
              payments.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
              callback(payments)
            },
            (fallbackError) => {
              console.error("Fallback subscription also failed:", fallbackError)
              callback([])
            },
          )
        }
        callback([])
      },
    )

    return unsubscribe
  } catch (error) {
    console.error("Error setting up payment subscription:", error)
    return () => {}
  }
}

export async function getMonthlyAggregates(clientId: string): Promise<MonthlyAggregate[]> {
  try {
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
  } catch (error) {
    console.error("Error getting monthly aggregates:", error)
    return []
  }
}

export async function getPaymentsByMonthAndClient(clientId: string, month: string): Promise<Payment[]> {
  try {
    const payments = await getPaymentsByClient(clientId)
    return payments
      .filter((p) => p.status === "approved")
      .filter((p) => {
        const date = new Date(p.approvedAt || p.submittedAt)
        return date.toISOString().slice(0, 7) === month
      })
  } catch (error) {
    console.error("Error getting payments by month and client:", error)
    return []
  }
}

