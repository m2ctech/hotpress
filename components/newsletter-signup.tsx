"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"

export function NewsletterSignup() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [email, setEmail] = useState(user?.email || "")
  const [submitted, setSubmitted] = useState(false)
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>([])

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedNewsletters((prev) => [...prev, value])
    } else {
      setSelectedNewsletters((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)

      // Save newsletter preferences if user is logged in
      if (user && selectedNewsletters.length > 0) {
        // In a real app, this would update the user's preferences in the database
        addToast(`Subscribed to ${selectedNewsletters.join(", ")}`, "success")
      } else {
        addToast("Thank you for subscribing!", "success")
      }
    }
  }

  return (
    <div>
      {submitted ? (
        <div className="flex flex-col items-center text-center py-2">
          <div className="bg-green-100 rounded-full p-2 mb-2">
            <Check className="h-5 w-5 text-green-600" />
          </div>
          <p className="font-medium">Thank you for subscribing!</p>
          <p className="text-sm text-muted-foreground mt-1">You'll receive our next newsletter in your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex flex-wrap gap-2">
            {["Daily News", "Breaking News", "Weekly Digest"].map((type) => (
              <label key={type} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  value={type}
                  onChange={handleCheckboxChange}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          <Button type="submit" className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80">
            Subscribe
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
    </div>
  )
}
