"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {  ToastContainer,toast } from "react-toastify"  
import { useAuth } from "@/contexts/auth-context"
import { subscribeToDailyMotivation } from "../lib/appwrite" 
import 'react-toastify/dist/ReactToastify.css'; 

export function NewsletterSignup() {
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email || "")
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>([])
  const [loading, setLoading] = useState(false) // State to track if the form is being submitted

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedNewsletters((prev) => [...prev, value])
    } else {
      setSelectedNewsletters((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Early return if no email or no newsletters are selected
    if (!email || selectedNewsletters.length === 0) {
      toast.error("Please select at least one newsletter.")
      return
    }

    setLoading(true) // Start loading

    try {
      // Call the function to write to Appwrite
      const message = await subscribeToDailyMotivation(email, selectedNewsletters)

      if (message) {
        toast.success(message)
      } else {
        toast.success("Thank you for subscribing!")
      }
    } catch (error) {
      toast.error("Failed to save Daily Motivation subscription.")
    } finally {
      setLoading(false) // Stop loading
    }
  }

  return (
    <div>
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

        <Button
          type="submit"
          className={`w-full bg-[black] text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Subscribing..." : "Subscribe"} {/* Change button text based on loading state */}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
     
     {/* <ToastContainer theme="colored" /> */}
    </div>
  )
}
