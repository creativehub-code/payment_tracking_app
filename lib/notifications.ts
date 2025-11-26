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

const NOTIFICATIONS_KEY = "paymentTracker_notifications"

export function getNotifications(userId: string): Notification[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(NOTIFICATIONS_KEY)
  const all: Notification[] = stored ? JSON.parse(stored) : []
  return all.filter((n) => n.userId === userId)
}

export function createNotification(
  userId: string,
  type: Notification["type"],
  paymentId: string,
  title: string,
  message: string,
): void {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem(NOTIFICATIONS_KEY)
  const all: Notification[] = stored ? JSON.parse(stored) : []

  const notification: Notification = {
    id: `notif_${Date.now()}`,
    userId,
    type,
    title,
    message,
    paymentId,
    read: false,
    createdAt: new Date().toISOString(),
  }

  all.push(notification)
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all))

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body: message })
  }
}

export function markNotificationAsRead(notificationId: string): void {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem(NOTIFICATIONS_KEY)
  const all: Notification[] = stored ? JSON.parse(stored) : []

  const notification = all.find((n) => n.id === notificationId)
  if (notification) {
    notification.read = true
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all))
  }
}

export function requestNotificationPermission(): void {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission()
  }
}
