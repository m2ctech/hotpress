"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTopHeadlines, formatArticle } from "@/lib/news-service"
import type { GNewsArticle } from "@/types/gnews"
import { LoadingSpinner } from "@/components/loading-spinner"

export function BreakingNewsCarousel() {
  const [articles, setArticles] = useState<GNewsArticle[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        setIsLoading(true)
        const response = await getTopHeadlines({ max: 3 })
        if (response.articles && response.articles.length > 0) {
          setArticles(response.articles)
        }
      } catch (error) {
        console.error("Error fetching breaking news:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBreakingNews()
  }, [])

  const nextSlide = () => {
    setActiveIndex((current) => (current === articles.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? articles.length - 1 : current - 1))
  }

  useEffect(() => {
    if (articles.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [articles, activeIndex])

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {articles.map((article) => {
            const formattedArticle = formatArticle(article)
            return (
              <div key={article.url} className="min-w-full p-6 bg-black">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{formattedArticle.title}</h3>
                  <p className="text-gray-300 mb-2">{formattedArticle.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(article.publishedAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <Button variant="link" className="text-[#FAD440] p-0 h-auto" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read Full Story
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-[#FAD440]" : "bg-white/50"}`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
