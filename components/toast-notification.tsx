"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "fixed flex items-center justify-between p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out z-50",
  {
    variants: {
      variant: {
        default: "bg-white text-black border border-gray-200",
        success: "bg-green-100 text-green-800 border border-green-200",
        error: "bg-red-100 text-red-800 border border-red-200",
        warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        info: "bg-blue-100 text-blue-800 border border-blue-200",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top-right",
    },
  },
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  duration?: number
  onClose?: () => void
  className?: string
}

export function Toast({ message, variant, position, duration = 3000, onClose, className }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) setTimeout(onClose, 300) // Allow time for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) setTimeout(onClose, 300) // Allow time for exit animation
  }

  return (
    <div
      className={cn(
        toastVariants({ variant, position }),
        isVisible ? "opacity-100" : "opacity-0 translate-y-2",
        className,
      )}
    >
      <span>{message}</span>
      <button onClick={handleClose} className="ml-4 p-1 rounded-full hover:bg-black/10">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

export interface ToastNotificationProps {
  toasts: Array<{
    id: string
    message: string
    variant?: "default" | "success" | "error" | "warning" | "info"
  }>
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
  onClose: (id: string) => void
}

export function ToastNotification({ toasts, position = "top-right", onClose }: ToastNotificationProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          position={position}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </>
  )
}
