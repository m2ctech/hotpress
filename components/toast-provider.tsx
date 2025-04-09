"use client"

import type { ReactNode } from "react"
import { ToastNotification } from "@/components/toast-notification"
import { useToast } from "@/hooks/use-toast"

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, removeToast } = useToast()

  return (
    <>
      {children}
      <ToastNotification toasts={toasts} onClose={removeToast} />
    </>
  )
}
