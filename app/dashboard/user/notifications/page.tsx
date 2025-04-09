"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { NotificationCenter } from "@/components/notification-center"
import { useToast } from "@/hooks/use-toast"

export default function NotificationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    if (!user) {
      addToast("Please sign in to view your notifications", "error")
      router.push("/auth/login")
    }
  }, [user, router, addToast])

  if (!user) {
    return null
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Your Notifications</h1>
      <NotificationCenter />
    </div>
  )
}
