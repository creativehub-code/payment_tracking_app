"use client"

import { useAuth } from "@/lib/auth-context"
import { getNotifications, markNotificationAsRead, requestNotificationPermission } from "@/lib/notifications"
import { useEffect, useState } from "react"

export default function NotificationsBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    requestNotificationPermission()

    if (user?.id) {
      const userNotifications = getNotifications(user.id)
      setNotifications(userNotifications)

      const interval = setInterval(() => {
        setNotifications(getNotifications(user.id))
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [user?.id])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 hover:bg-muted-background rounded">
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-muted-background border border-muted/30 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-muted/30">
            <h3 className="font-semibold text-foreground">Notifications</h3>
          </div>

          {notifications.length > 0 ? (
            <div className="divide-y divide-muted/30">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => {
                    markNotificationAsRead(notification.id)
                    setNotifications(getNotifications(user!.id))
                  }}
                  className={`p-3 cursor-pointer hover:bg-background/50 transition-colors ${
                    !notification.read ? "bg-primary/10" : ""
                  }`}
                >
                  <p className="font-medium text-foreground text-sm">{notification.title}</p>
                  <p className="text-muted text-xs mt-1">{notification.message}</p>
                  <p className="text-muted text-xs mt-2">{new Date(notification.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted text-sm">No notifications yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
