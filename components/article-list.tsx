"use client"

import { useState, useEffect } from "react"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { getTopHeadlines, getNewsByCategory, formatArticle } from "@/lib/news-service"
import type { GNewsArticle } from "@/types/gnews"
import { useToast } from "@/hooks/use-toast"

interface ArticleListProps {
  category?: string
  limit?: number
  showLoadMore?: boolean
}

export function ArticleList({ category, limit = 6, showLoadMore = true }: ArticleListProps) {
  const [articles, setArticles] = useState<GNewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { addToast } = useToast()

  const fetchArticles = async (reset = false) => {
    try {
      setIsLoading(true)
      const newPage = reset ? 1 : page

      let response
      if (category) {
        response = await getNewsByCategory(category, { max: limit, page: newPage })
      } else {
        response = await getTopHeadlines({ max: limit, page: newPage })
      }

      const newArticles = response.articles

      if (reset) {
        setArticles(newArticles)
      } else {
        setArticles((prev) => [...prev, ...newArticles])
      }

      setPage(newPage + 1)
      setHasMore(newArticles.length === limit)
    } catch (error) {
      console.error("Error fetching articles:", error)
      addToast("Failed to load articles", "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles(true)
  }, [category])

  const handleLoadMore = () => {
    fetchArticles()
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.url} article={formatArticle(article)} />
        ))}

        {/* Loading placeholders */}
        {isLoading &&
          articles.length === 0 &&
          Array(limit)
            .fill(0)
            .map((_, index) => <ArticleCard key={`loading-${index}`} isLoading={true} />)}
      </div>

      {showLoadMore && hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Articles"}
          </Button>
        </div>
      )}
    </div>
  )
}
