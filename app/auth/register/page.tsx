"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth, INTERESTS, AGE_RANGES } from "@/contexts/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const { addToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
    ageRange: "",
    location: "",
    interests: [] as string[],
    notifications: {
      email: true,
      browser: true,
      mobile: false,
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user types
    if (error) setError("")
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user makes a selection
    if (error) setError("")
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
      return { ...prev, interests }
    })
  }

  const handleNotificationToggle = (type: keyof typeof formData.notifications) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }))
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all required fields")
        return
      }

      if (!formData.agreeToTerms) {
        setError("You must agree to the terms and conditions")
        return
      }

      // Password validation
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long")
        return
      }
    }

    setError("") // Clear any errors
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setError("") // Clear any errors
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    try {
      const success = await register(formData.name, formData.email, formData.password, {
        interests: formData.interests,
        ageRange: formData.ageRange,
        location: formData.location,
        notifications: formData.notifications,
      })

      if (success) {
        router.push("/dashboard/user")
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-black inline-block">
              HOT PRESS MEDIA
            </Link>
            <h1 className="text-2xl font-bold mt-6">Create an account</h1>
            <p className="text-muted-foreground mt-2">Sign up to get started with Hot Press Media</p>
          </div>

          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeToTerms: checked === true }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#FAD440] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#FAD440] hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80"
                    onClick={nextStep}
                  >
                    Next: Personalize Your Experience
                  </Button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ageRange">Age Range (Optional)</Label>
                    <Select value={formData.ageRange} onValueChange={(value) => handleSelectChange("ageRange", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your age range" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="City, Country"
                        className="pl-10"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Interests (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {INTERESTS.map((interest) => (
                        <label key={interest} className="flex items-center space-x-2 text-sm">
                          <Checkbox
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={() => handleInterestToggle(interest)}
                          />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Preferences</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2 text-sm">
                        <Checkbox
                          checked={formData.notifications.email}
                          onCheckedChange={() => handleNotificationToggle("email")}
                        />
                        <span>Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm">
                        <Checkbox
                          checked={formData.notifications.browser}
                          onCheckedChange={() => handleNotificationToggle("browser")}
                        />
                        <span>Browser notifications</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm">
                        <Checkbox
                          checked={formData.notifications.mobile}
                          onCheckedChange={() => handleNotificationToggle("mobile")}
                        />
                        <span>Mobile notifications</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#FAD440] text-black hover:bg-[#FAD440]/80"
                      disabled={isLoading || !formData.agreeToTerms}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            {currentStep === 1 && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      Facebook
                    </Button>
                  </div>
                </div>

                <p className="text-center mt-6 text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-[#FAD440] hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
