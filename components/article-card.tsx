"use client"

import { BookmarkPlus, Share2, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface ArticleProps {
  id: string
  title: string
  excerpt: string
  content?: string
  image: string
  category?: string
  date: string
  source?: string
  sourceUrl?: string
  url: string
  publishedAt: string
}

interface ArticleCardProps {
  article?: ArticleProps
  category?: string
  isLoading?: boolean
}

export function ArticleCard({ article, category, isLoading = false }: ArticleCardProps) {
  const { user, bookmarkArticle, isArticleBookmarked, likeArticle, isArticleLiked, addToReadingHistory } = useAuth()
  const { addToast } = useToast()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // If no article is provided, use default values
  const articleId = article?.id || "default-id"
  const title = article?.title || "New Study Reveals Surprising Benefits of Coffee for Heart Health"
  const excerpt =
    article?.excerpt ||
    "Researchers found that moderate coffee consumption may have protective effects against certain cardiovascular conditions."
  const image = article?.image || "/placeholder.svg?height=200&width=400"
  const date = article?.date || "2 hours ago"
  const articleCategory = category || article?.category || "News"
  const articleUrl = article?.url || "#"

  useEffect(() => {
    // Only run once when the component mounts or when user/articleId/article changes
    if (user) {
      const bookmarked = isArticleBookmarked?.(articleId) || false
      const liked = isArticleLiked?.(articleId) || false

      setIsBookmarked(bookmarked)
      setIsLiked(liked)
    }
  }, [user, articleId, article, isArticleBookmarked, isArticleLiked])

  const handleBookmark = async () => {
    if (!user) {
      addToast("Please sign in to bookmark articles", "info")
      return
    }

    setIsUpdating(true)
    try {
      await bookmarkArticle?.(articleId)
      setIsBookmarked(!isBookmarked)
      addToast(
        isBookmarked ? "Article removed from bookmarks" : "Article saved to bookmarks",
        isBookmarked ? "info" : "success",
      )
    } catch (error) {
      console.error("Error bookmarking article:", error)
      addToast("Failed to update bookmarks", "error")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLike = async () => {
    if (!user) {
      addToast("Please sign in to like articles", "info")
      return
    }

    setIsUpdating(true)
    try {
      // Update like in Appwrite
      await likeArticle?.(articleId)

      // Update local state
      const newLikeState = !isLiked
      setIsLiked(newLikeState)
      setLikes((prevLikes) => (newLikeState ? prevLikes + 1 : prevLikes - 1))
    } catch (error) {
      console.error("Error liking article:", error)
      addToast("Failed to update like", "error")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleShare = () => {
    // Create a share URL
    const shareUrl = articleUrl

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: excerpt,
          url: shareUrl,
        })
        .catch((error) => {
          console.error("Error sharing:", error)
          // Fallback to clipboard
          copyToClipboard(shareUrl)
        })
    } else {
      // Fallback to clipboard
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        addToast("Share link copied to clipboard", "success")
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error)
        addToast("Failed to copy link", "error")
      })
  }

  const handleArticleClick = () => {
    if (user && addToReadingHistory) {
      addToReadingHistory(articleId)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-lg overflow-hidden border group h-[300px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden border group">
      <div className="relative aspect-video">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <Badge className="absolute top-2 left-2 bg-[#FAD440] text-black">{articleCategory}</Badge>
      </div>
      <div className="p-4">
        <a href={articleUrl} target="_blank" rel="noopener noreferrer" onClick={handleArticleClick}>
          <h3 className="font-bold text-lg mb-2 group-hover:text-[#FAD440] transition-colors">{title}</h3>
        </a>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">{date}</div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLike} disabled={isUpdating}>
              <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current text-[#FAD440]" : ""}`} />
              <span className="sr-only">Like article</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark} disabled={isUpdating}>
              <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? "fill-current text-[#FAD440]" : ""}`} />
              <span className="sr-only">Save article</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share article</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
