import { Account, Client, Databases, Storage, ID, Query, type Models } from "appwrite"

// Initialize the Appwrite client
export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("your-project-id") // Replace with your project ID

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

// Database and collection IDs
export const DATABASE_ID = "hot-press-media"
export const USERS_COLLECTION_ID = "users"
export const ARTICLES_COLLECTION_ID = "articles"
export const COMMENTS_COLLECTION_ID = "comments"
export const CATEGORIES_COLLECTION_ID = "categories"
export const STORAGE_BUCKET_ID = "media-bucket"

// Types
export interface Article extends Models.Document {
  title: string
  subtitle?: string
  content: string
  category: string
  featuredImageUrl?: string
  tags: string[]
  authorId: string
  authorName: string
  status: "draft" | "published" | "scheduled"
  publishDate?: string
  publishTime?: string
  views?: number
  likes?: number
  createdAt: string
  updatedAt: string
}

// Helper functions for authentication
export const createAccount = async (email: string, password: string, name: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)

    if (newAccount) {
      // Create a session
      await account.createEmailSession(email, password)

      // Create a user document in the database
      const user = await databases.createDocument(DATABASE_ID, USERS_COLLECTION_ID, ID.unique(), {
        userId: newAccount.$id,
        email: email,
        name: name,
        role: "user",
        isPremium: false,
        preferences: {
          interests: [],
          newsletters: [],
          notifications: {
            email: true,
            browser: true,
            mobile: false,
          },
          darkMode: false,
          fontSize: "medium",
        },
        bookmarks: [],
        readingHistory: [],
        likedArticles: [],
      })

      return { newAccount, user }
    }
  } catch (error) {
    console.error("Error creating account:", error)
    throw error
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailSession(email, password)
    const accountDetails = await account.get()

    // Get user data from database
    const users = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("userId", accountDetails.$id),
    ])

    if (users.documents.length > 0) {
      return { session, user: users.documents[0] }
    } else {
      throw new Error("User data not found")
    }
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

export const signOut = async () => {
  try {
    return await account.deleteSession("current")
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    // Get user data from database
    const users = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
      Query.equal("userId", currentAccount.$id),
    ])

    if (users.documents.length > 0) {
      return users.documents[0]
    }

    return null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Article CRUD operations
export const getArticles = async (filters = [], limit = 10, offset = 0) => {
  try {
    const articles = await databases.listDocuments(DATABASE_ID, ARTICLES_COLLECTION_ID, [
      ...filters,
      Query.limit(limit),
      Query.offset(offset),
    ])

    return articles.documents as unknown as Article[]
  } catch (error) {
    console.error("Error getting articles:", error)
    throw error
  }
}

export const getArticlesByCategory = async (category: string, limit = 10, offset = 0) => {
  try {
    const articles = await databases.listDocuments(DATABASE_ID, ARTICLES_COLLECTION_ID, [
      Query.equal("category", category),
      Query.equal("status", "published"),
      Query.orderDesc("createdAt"),
      Query.limit(limit),
      Query.offset(offset),
    ])

    return articles.documents as unknown as Article[]
  } catch (error) {
    console.error("Error getting articles by category:", error)
    throw error
  }
}

export const getFeaturedArticles = async (limit = 5) => {
  try {
    const articles = await databases.listDocuments(DATABASE_ID, ARTICLES_COLLECTION_ID, [
      Query.equal("status", "published"),
      Query.orderDesc("views"),
      Query.limit(limit),
    ])

    return articles.documents as unknown as Article[]
  } catch (error) {
    console.error("Error getting featured articles:", error)
    throw error
  }
}

export const getLatestArticles = async (limit = 10) => {
  try {
    const articles = await databases.listDocuments(DATABASE_ID, ARTICLES_COLLECTION_ID, [
      Query.equal("status", "published"),
      Query.orderDesc("createdAt"),
      Query.limit(limit),
    ])

    return articles.documents as unknown as Article[]
  } catch (error) {
    console.error("Error getting latest articles:", error)
    throw error
  }
}

export const getArticleById = async (id: string) => {
  try {
    const article = await databases.getDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, id)

    // Increment view count
    await databases.updateDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, id, {
      views: (article.views || 0) + 1,
    })

    return article as unknown as Article
  } catch (error) {
    console.error("Error getting article:", error)
    throw error
  }
}

export const createArticle = async (data: Partial<Article>) => {
  try {
    return (await databases.createDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, ID.unique(), {
      ...data,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })) as unknown as Article
  } catch (error) {
    console.error("Error creating article:", error)
    throw error
  }
}

export const updateArticle = async (id: string, data: Partial<Article>) => {
  try {
    return (await databases.updateDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    })) as unknown as Article
  } catch (error) {
    console.error("Error updating article:", error)
    throw error
  }
}

export const deleteArticle = async (id: string) => {
  try {
    return await databases.deleteDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, id)
  } catch (error) {
    console.error("Error deleting article:", error)
    throw error
  }
}

export const searchArticles = async (query: string, limit = 10) => {
  try {
    // Search in title and content
    const articles = await databases.listDocuments(DATABASE_ID, ARTICLES_COLLECTION_ID, [
      Query.search("title", query),
      Query.equal("status", "published"),
      Query.limit(limit),
    ])

    return articles.documents as unknown as Article[]
  } catch (error) {
    console.error("Error searching articles:", error)
    throw error
  }
}

// Comment CRUD operations
export const getComments = async (articleId: string) => {
  try {
    const comments = await databases.listDocuments(DATABASE_ID, COMMENTS_COLLECTION_ID, [
      Query.equal("articleId", articleId),
      Query.orderDesc("createdAt"),
    ])

    return comments.documents
  } catch (error) {
    console.error("Error getting comments:", error)
    throw error
  }
}

export const createComment = async (data: any) => {
  try {
    return await databases.createDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, ID.unique(), {
      ...data,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error creating comment:", error)
    throw error
  }
}

// User operations
export const updateUserPreferences = async (userId: string, preferences: any) => {
  try {
    return await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, { preferences })
  } catch (error) {
    console.error("Error updating user preferences:", error)
    throw error
  }
}

export const bookmarkArticle = async (userId: string, articleId: string, currentBookmarks: string[]) => {
  try {
    let updatedBookmarks

    if (currentBookmarks.includes(articleId)) {
      // Remove bookmark
      updatedBookmarks = currentBookmarks.filter((id) => id !== articleId)
    } else {
      // Add bookmark
      updatedBookmarks = [...currentBookmarks, articleId]
    }

    return await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, { bookmarks: updatedBookmarks })
  } catch (error) {
    console.error("Error updating bookmarks:", error)
    throw error
  }
}

export const likeArticle = async (userId: string, articleId: string, currentLikes: string[]) => {
  try {
    let updatedLikes
    let incrementValue = 0

    if (currentLikes.includes(articleId)) {
      // Remove like
      updatedLikes = currentLikes.filter((id) => id !== articleId)
      incrementValue = -1
    } else {
      // Add like
      updatedLikes = [...currentLikes, articleId]
      incrementValue = 1
    }

    // Update user's liked articles
    await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, { likedArticles: updatedLikes })

    // Update article's like count
    try {
      const article = await databases.getDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, articleId)
      await databases.updateDocument(DATABASE_ID, ARTICLES_COLLECTION_ID, articleId, {
        likes: (article.likes || 0) + incrementValue,
      })
    } catch (error) {
      console.error("Error updating article like count:", error)
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating likes:", error)
    throw error
  }
}

export const addToReadingHistory = async (userId: string, articleId: string, currentHistory: string[]) => {
  try {
    // Add to reading history if not already there
    if (!currentHistory.includes(articleId)) {
      const updatedHistory = [articleId, ...currentHistory]

      // Limit history to 100 items
      const limitedHistory = updatedHistory.slice(0, 100)

      return await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
        readingHistory: limitedHistory,
      })
    }

    return null
  } catch (error) {
    console.error("Error updating reading history:", error)
    throw error
  }
}

// File upload
export const uploadFile = async (file: File) => {
  try {
    const result = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), file)

    // Get file view URL
    const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, result.$id)

    return { result, fileUrl }
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

// Categories
export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(DATABASE_ID, CATEGORIES_COLLECTION_ID)
    return categories.documents
  } catch (error) {
    console.error("Error getting categories:", error)
    throw error
  }
}
