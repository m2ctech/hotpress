"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { ArticleCard } from "@/components/article-card"
import { searchNews, formatArticle } from "@/lib/news-service"
import type { NewsApiArticle, NewsApiResponse } from "@/types/newsapi"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [articles, setArticles] = useState<NewsApiArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) return

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await searchNews(query)
        setArticles(response.articles)
      } catch (error) {
        console.error("Error searching news:", error)
        setError("Failed to fetch search results. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url)

    setIsLoading(true)
    setError(null)
    searchNews(searchQuery)
      .then((response) => {
        setArticles(response.articles)
      })
      .catch((error) => {
        setError("Failed to fetch search results. Please try again.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50">
        <div className="bg-[#FAD440] py-2">
          <div className="container flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-black">
              HOT PRESS MEDIA
            </Link>
            <UserAccountNav />
          </div>
        </div>
        <MainNav />
      </header>

      <main className="flex-1">
        <section className="bg-black text-white py-8">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Search News</h1>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for news articles..."
                  className="pl-10 py-6 bg-white text-black text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-1 top-1 bg-[#FAD440] text-black hover:bg-[#FAD440]/80">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            {query && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  Search results for: <span className="text-[#FAD440]">"{query}"</span>
                </h2>
                <p className="text-muted-foreground mt-1">Found {articles.length} results</p>
                <Separator className="my-4" />
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size={40} />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                {query ? (
                  <>
                    <h3 className="text-xl font-bold mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      We couldn't find any articles matching "{query}". Please try a different search term.
                    </p>
                  </>
                ) : (
                  <p className="text-muted-foreground">Enter a search term to find news articles.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.url} article={formatArticle(article)} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-[#FAD440] mb-2">HOT PRESS MEDIA</h3>
              <p className="text-sm text-gray-300">Your trusted source for the latest news</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-gray-300 hover:text-[#FAD440]">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-[#FAD440]">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-[#FAD440]">
                Contact
              </Link>
            </div>
          </div>
          <Separator className="my-6 bg-gray-800" />
          <p className="text-sm text-gray-400 text-center">© 2025 Hot Press Media. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
