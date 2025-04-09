"use client"

import Link from "next/link"
import { BookmarkPlus, Share2, MessageSquare, ThumbsUp, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { UserAccountNav } from "@/components/user-account-nav"
import type { GNewsArticle } from "@/types/gnews"
import { formatArticle } from "@/lib/news-service"
import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface ArticleViewProps {
  article: GNewsArticle
}

export function ArticleView({ article }: ArticleViewProps) {
  const { user, addToReadingHistory } = useAuth()
  const formattedArticle = formatArticle(article)

  useEffect(() => {
    if (user && addToReadingHistory) {
      addToReadingHistory(formattedArticle.id)
    }
  }, [user, formattedArticle.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="bg-black text-white hover:bg-black/80">
                Subscribe
              </Button>
              <UserAccountNav />
            </div>
          </div>
        </div>
        <MainNav />
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Badge className="mb-2 bg-[#FAD440] text-black">NEWS</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{article.description}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <p className="font-medium">{article.source.name}</p>
                    <p className="text-sm text-muted-foreground">News Source</p>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {Math.ceil(article.content.length / 1000)} min read
                  </div>
                </div>

                <div className="relative aspect-video mb-6">
                  <img
                    src={article.image || "/placeholder.svg?height=500&width=900"}
                    alt="Article hero image"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                <div className="prose max-w-none mb-8">
                  <p>{article.content}</p>
                  <p className="mt-4">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FAD440] hover:underline"
                    >
                      Read the full article at {article.source.name}
                    </a>
                  </p>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Comment
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="mr-1 h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: article.title,
                            text: article.description,
                            url: article.url,
                          })
                        } else {
                          navigator.clipboard.writeText(article.url)
                        }
                      }}
                    >
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">About the Source</h3>
                <p className="text-sm mb-4">
                  This article is from {article.source.name}, a news source covering the latest events and stories.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={article.source.url} target="_blank" rel="noopener noreferrer">
                    <User className="mr-2 h-4 w-4" />
                    Visit Source
                  </a>
                </Button>
              </div>

              <div className="bg-[#FAD440]/10 border border-[#FAD440] p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>
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
