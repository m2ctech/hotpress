"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useAuth } from "@/contexts/auth-context"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  date: string
  link?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "date">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  deleteNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Mock notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Welcome to Daily Pulse!",
    message: "Thank you for joining our community. Start exploring the latest news now.",
    type: "success",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "2",
    title: "Breaking News",
    message: "Major tech company announces revolutionary AI product.",
    type: "info",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    link: "/article/2",
  },
  {
    id: "3",
    title: "Your article has been published",
    message: "Your article 'The Future of Renewable Energy' is now live.",
    type: "success",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    link: "/article/3",
  },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    `dailypulse_notifications_${user?.id || "guest"}`,
    [],
  )

  // Initialize with mock notifications for new users
  useEffect(() => {
    if (user && notifications.length === 0) {
      setNotifications(MOCK_NOTIFICATIONS)
    }
  }, [user, notifications.length, setNotifications])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const addNotification = (notification: Omit<Notification, "id" | "read" | "date">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      read: false,
      date: new Date().toISOString(),
    }
    setNotifications([newNotification, ...notifications])
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
