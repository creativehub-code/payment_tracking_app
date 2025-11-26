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

export interface RegisteredClient {
  id: string
  email: string
  password: string // Note: In production, use Firebase Auth instead of storing passwords
  name: string
  createdAt: string
  createdBy: string
  targetAmount: number
  remainingAmount: number
}

const CLIENTS_COLLECTION = "clients"

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

// Convert Client to Firestore document
const clientToFirestore = (client: Omit<RegisteredClient, "id">): DocumentData => {
  return {
    ...client,
    createdAt: Timestamp.fromDate(new Date(client.createdAt)),
  }
}

// Convert Firestore document to Client
const firestoreToClient = (doc: DocumentData): RegisteredClient => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    createdAt: timestampToISO(data.createdAt),
  } as RegisteredClient
}

export async function getClients(): Promise<RegisteredClient[]> {
  try {
    checkFirebaseAvailable()
    const clientsRef = collection(db!, CLIENTS_COLLECTION)
    const q = query(clientsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(firestoreToClient)
  } catch (error) {
    console.error("Error getting clients:", error)
    return []
  }
}

export async function getClientById(clientId: string): Promise<RegisteredClient | null> {
  try {
    checkFirebaseAvailable()
    const clientRef = doc(db!, CLIENTS_COLLECTION, clientId)
    const clientSnap = await getDoc(clientRef)
    if (clientSnap.exists()) {
      return firestoreToClient(clientSnap)
    }
    return null
  } catch (error) {
    console.error("Error getting client:", error)
    return null
  }
}

export async function getClientByEmail(email: string): Promise<RegisteredClient | null> {
  try {
    checkFirebaseAvailable()
    const clientsRef = collection(db!, CLIENTS_COLLECTION)
    const q = query(clientsRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      return firestoreToClient(querySnapshot.docs[0])
    }
    return null
  } catch (error) {
    console.error("Error getting client by email:", error)
    return null
  }
}

export async function addClient(client: Omit<RegisteredClient, "id" | "createdAt">): Promise<RegisteredClient> {
  try {
    // Check if client with email already exists
    const existing = await getClientByEmail(client.email)
    if (existing) {
      throw new Error("Client with this email already exists")
    }

    checkFirebaseAvailable()
    const clientsRef = collection(db!, CLIENTS_COLLECTION)
    const newClient = {
      ...client,
      createdAt: new Date().toISOString(),
    }
    const docRef = await addDoc(clientsRef, clientToFirestore(newClient))
    const clientDoc = await getDoc(docRef)
    if (clientDoc.exists()) {
      return firestoreToClient(clientDoc)
    }
    throw new Error("Failed to create client")
  } catch (error) {
    console.error("Error adding client:", error)
    throw error
  }
}

export async function updateClient(clientId: string, updates: Partial<RegisteredClient>): Promise<void> {
  try {
    checkFirebaseAvailable()
    const clientRef = doc(db!, CLIENTS_COLLECTION, clientId)
    const updateData: any = { ...updates }
    delete updateData.id // Remove id from updates

    if (updateData.createdAt) {
      updateData.createdAt = Timestamp.fromDate(new Date(updateData.createdAt))
    }

    await updateDoc(clientRef, updateData)
  } catch (error) {
    console.error("Error updating client:", error)
    throw error
  }
}

export async function deleteClient(clientId: string): Promise<void> {
  try {
    checkFirebaseAvailable()
    const clientRef = doc(db!, CLIENTS_COLLECTION, clientId)
    await deleteDoc(clientRef)
  } catch (error) {
    console.error("Error deleting client:", error)
    throw error
  }
}

export async function updateClientTarget(clientId: string, targetAmount: number): Promise<void> {
  try {
    const client = await getClientById(clientId)
    if (!client) {
      throw new Error("Client not found")
    }

    const approvedSoFar = client.targetAmount - client.remainingAmount
    const remainingAmount = Math.max(0, targetAmount - approvedSoFar)

    await updateClient(clientId, {
      targetAmount,
      remainingAmount,
    })
  } catch (error) {
    console.error("Error updating client target:", error)
    throw error
  }
}

export async function decrementClientRemaining(clientId: string, amount: number): Promise<void> {
  try {
    const client = await getClientById(clientId)
    if (!client) {
      throw new Error("Client not found")
    }

    const remainingAmount = Math.max(0, client.remainingAmount - amount)
    await updateClient(clientId, { remainingAmount })
  } catch (error) {
    console.error("Error decrementing client remaining:", error)
    throw error
  }
}

export function subscribeToClients(callback: (clients: RegisteredClient[]) => void): () => void {
  try {
    if (!db) {
      console.warn("Firebase not initialized, subscription disabled")
      return () => {}
    }
    const clientsRef = collection(db, CLIENTS_COLLECTION)
    const q = query(clientsRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const clients = snapshot.docs.map(firestoreToClient)
        callback(clients)
      },
      (error) => {
        console.error("Error subscribing to clients:", error)
        callback([])
      },
    )

    return unsubscribe
  } catch (error) {
    console.error("Error setting up client subscription:", error)
    return () => {}
  }
}

