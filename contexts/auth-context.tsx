"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  createAccount,
  signIn,
  signOut,
  getCurrentUser,
  bookmarkArticle as bookmarkArticleApi,
  likeArticle as likeArticleApi,
  addToReadingHistory as addToReadingHistoryApi,
  updateUserPreferences as updateUserPreferencesApi,
} from "@/lib/appwrite"

// Define user interests and age ranges for registration
export const INTERESTS = [
  "Politics",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Entertainment",
  "Education",
  "Travel",
  "Food",
  "Fashion",
  "Real Estate",
]

export const AGE_RANGES = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"]

export interface UserPreferences {
  interests: string[]
  newsletters: string[]
  notifications: {
    email: boolean
    browser: boolean
    mobile: boolean
  }
  darkMode: boolean
  fontSize: "small" | "medium" | "large"
  ageRange?: string
  location?: string
}

export interface User {
  $id: string
  name: string
  email: string
  role: "user" | "journalist" | "admin"
  isPremium: boolean
  avatar?: string
  preferences: UserPreferences
  bookmarks?: string[]
  readingHistory?: string[]
  likedArticles?: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, preferences: Partial<UserPreferences>) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  isAuthenticated: boolean
  toggleRole: () => void // For demo purposes to switch between user and journalist
  bookmarkArticle: (articleId: string) => void
  isArticleBookmarked: (articleId: string) => boolean
  likeArticle: (articleId: string) => void
  isArticleLiked: (articleId: string) => boolean
  addToReadingHistory: (articleId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToast()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser as unknown as User)
        }
      } catch (error) {
        console.error("Session check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const { user } = await signIn(email, password)
      setUser(user as unknown as User)
      addToast("Successfully logged in", "success")
      return true
    } catch (error) {
      console.error("Login error:", error)
      addToast("Invalid email or password", "error")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, preferences: Partial<UserPreferences>) => {
    setIsLoading(true)

    try {
      const { user } = await createAccount(email, password, name)

      // Update user preferences if provided
      if (Object.keys(preferences).length > 0) {
        await updateUserPreferencesApi(user.$id, {
          ...user.preferences,
          ...preferences,
        })
      }

      setUser(user as unknown as User)
      addToast("Account created successfully", "success")
      return true
    } catch (error) {
      console.error("Registration error:", error)
      addToast("Failed to create account", "error")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut()
      setUser(null)
      addToast("Successfully logged out", "info")
    } catch (error) {
      console.error("Logout error:", error)
      addToast("Failed to log out", "error")
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return

    try {
      // Update user in database
      // This would need to be implemented in the appwrite.ts file
      // For now, just update the local state
      setUser({ ...user, ...userData })
      addToast("Profile updated successfully", "success")
    } catch (error) {
      console.error("Update user error:", error)
      addToast("Failed to update profile", "error")
    }
  }

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user) return

    try {
      await updateUserPreferencesApi(user.$id, {
        ...user.preferences,
        ...preferences,
      })

      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      })

      addToast("Preferences updated successfully", "success")
    } catch (error) {
      console.error("Update preferences error:", error)
      addToast("Failed to update preferences", "error")
    }
  }

  // For demo purposes - toggle between user and journalist roles
  const toggleRole = async () => {
    if (!user) return

    const newRole = user.role === "user" ? "journalist" : "user"

    try {
      // Update role in database
      // This would need to be implemented in the appwrite.ts file
      // For now, just update the local state
      setUser({ ...user, role: newRole })
      addToast(`Switched to ${newRole} role`, "info")
    } catch (error) {
      console.error("Toggle role error:", error)
      addToast("Failed to switch role", "error")
    }
  }

  // Bookmark functionality
  const bookmarkArticle = async (articleId: string) => {
    if (!user) return

    try {
      const updatedUser = await bookmarkArticleApi(user.$id, articleId, user.bookmarks || [])

      setUser(updatedUser as unknown as User)

      const isBookmarked = (updatedUser.bookmarks || []).includes(articleId)
      addToast(
        isBookmarked ? "Article saved to bookmarks" : "Article removed from bookmarks",
        isBookmarked ? "success" : "info",
      )
    } catch (error) {
      console.error("Bookmark error:", error)
      addToast("Failed to update bookmarks", "error")
    }
  }

  const isArticleBookmarked = (articleId: string): boolean => {
    return user?.bookmarks?.includes(articleId) || false
  }

  // Like functionality
  const likeArticle = async (articleId: string) => {
    if (!user) return

    try {
      const updatedUser = await likeArticleApi(user.$id, articleId, user.likedArticles || [])

      setUser(updatedUser as unknown as User)
    } catch (error) {
      console.error("Like error:", error)
      addToast("Failed to update likes", "error")
    }
  }

  const isArticleLiked = (articleId: string): boolean => {
    return user?.likedArticles?.includes(articleId) || false
  }

  // Reading history
  const addToReadingHistory = async (articleId: string) => {
    if (!user) return

    try {
      const updatedUser = await addToReadingHistoryApi(user.$id, articleId, user.readingHistory || [])

      if (updatedUser) {
        setUser(updatedUser as unknown as User)
      }
    } catch (error) {
      console.error("Reading history error:", error)
      // Don't show toast for this error as it's not critical
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        updatePreferences,
        isAuthenticated: !!user,
        toggleRole,
        bookmarkArticle,
        isArticleBookmarked,
        likeArticle,
        isArticleLiked,
        addToReadingHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
