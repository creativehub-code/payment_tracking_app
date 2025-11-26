import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
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

export interface Notification {
  id: string
  userId: string
  type: "payment_approved" | "payment_rejected" | "payment_submitted"
  title: string
  message: string
  paymentId: string
  read: boolean
  createdAt: string
}

const NOTIFICATIONS_COLLECTION = "notifications"

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

// Convert Notification to Firestore document
const notificationToFirestore = (notification: Omit<Notification, "id">): DocumentData => {
  return {
    ...notification,
    createdAt: Timestamp.fromDate(new Date(notification.createdAt)),
  }
}

// Convert Firestore document to Notification
const firestoreToNotification = (doc: DocumentData): Notification => {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    createdAt: timestampToISO(data.createdAt),
  } as Notification
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  try {
    checkFirebaseAvailable()
    const notificationsRef = collection(db!, NOTIFICATIONS_COLLECTION)
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(firestoreToNotification)
  } catch (error) {
    console.error("Error getting notifications:", error)
    return []
  }
}

export async function createNotification(
  userId: string,
  type: Notification["type"],
  paymentId: string,
  title: string,
  message: string,
): Promise<void> {
  try {
    checkFirebaseAvailable()
    const notificationsRef = collection(db!, NOTIFICATIONS_COLLECTION)
    const notification: Omit<Notification, "id"> = {
      userId,
      type,
      title,
      message,
      paymentId,
      read: false,
      createdAt: new Date().toISOString(),
    }

    await addDoc(notificationsRef, notificationToFirestore(notification))

    // Show browser notification if permission granted
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body: message })
    }
  } catch (error) {
    console.error("Error creating notification:", error)
    throw error
  }
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    checkFirebaseAvailable()
    const notificationRef = doc(db!, NOTIFICATIONS_COLLECTION, notificationId)
    await updateDoc(notificationRef, { read: true })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw error
  }
}

export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void,
): () => void {
  try {
    if (!db) {
      console.warn("Firebase not initialized, subscription disabled")
      return () => {}
    }
    const notificationsRef = collection(db, NOTIFICATIONS_COLLECTION)
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifications = snapshot.docs.map(firestoreToNotification)
        callback(notifications)
      },
      (error) => {
        console.error("Error subscribing to notifications:", error)
        callback([])
      },
    )

    return unsubscribe
  } catch (error) {
    console.error("Error setting up notification subscription:", error)
    return () => {}
  }
}

export function requestNotificationPermission(): void {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission()
  }
}

