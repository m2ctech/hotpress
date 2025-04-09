"use client"

import { BookmarkPlus, Share2, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import type { GNewsArticle } from "@/types/gnews"
import { getTopHeadlines, formatArticle } from "@/lib/news-service"
import { LoadingSpinner } from "@/components/loading-spinner"

export function FeaturedArticle() {
  const [article, setArticle] = useState<GNewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        setIsLoading(true)
        const response = await getTopHeadlines({ max: 1 })
        if (response.articles && response.articles.length > 0) {
          setArticle(response.articles[0])
        }
      } catch (error) {
        console.error("Error fetching featured article:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedArticle()
  }, [])

  if (isLoading) {
    return (
      <div className="rounded-lg overflow-hidden border h-[400px] flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (!article) {
    return null
  }

  const formattedArticle = formatArticle(article)

  return (
    <div className="rounded-lg overflow-hidden border">
      <div className="relative aspect-[16/9]">
        <img
          src={formattedArticle.image || "/placeholder.svg?height=500&width=900"}
          alt="Featured article"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <Badge className="mb-2 bg-[#FAD440] text-black">FEATURED</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{formattedArticle.title}</h2>
          <p className="text-gray-200 mb-4 max-w-2xl">{formattedArticle.excerpt}</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">{article.source.name}</p>
              <p className="text-sm text-gray-300">
                {new Date(article.publishedAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <MessageSquare className="mr-1 h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <BookmarkPlus className="mr-1 h-4 w-4" />
            Save
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
