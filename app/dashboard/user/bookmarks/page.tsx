"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bookmark, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

// Mock articles data
const ARTICLES = [
  {
    id: 1,
    title: "Global Summit on Climate Change Begins Today",
    excerpt: "World leaders gather to discuss urgent climate action measures.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Politics",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "New Legislation Aims to Reform Healthcare System",
    excerpt: "Lawmakers propose sweeping changes to improve healthcare accessibility and affordability.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Politics",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "International Trade Negotiations Enter Final Phase",
    excerpt: "Key economic powers work to finalize agreement on tariffs and market access.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    date: "1 day ago",
  },
  {
    id: 4,
    title: "Tech Giant Announces Record Quarterly Profits",
    excerpt: "Company exceeds analyst expectations with strong performance in cloud services.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    date: "3 hours ago",
  },
  {
    id: 5,
    title: "Startup Raises $50 Million in Series B Funding",
    excerpt: "Innovative fintech platform attracts major investment to expand global operations.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    date: "1 day ago",
  },
]

export default function BookmarksPage() {
  const { user, bookmarkArticle } = useAuth()
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    if (!user) {
      addToast("Please sign in to view your bookmarks", "error")
      router.push("/auth/login")
    }
  }, [user, router, addToast])

  if (!user) {
    return null
  }

  // Get bookmarked articles
  const bookmarkedArticles = ARTICLES.filter((article) => user.bookmarks?.includes(article.id))

  const handleRemoveBookmark = (articleId: number) => {
    bookmarkArticle(articleId)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Bookmarks</h1>
          <p className="text-muted-foreground">Articles you've saved for later reading</p>
        </div>
      </div>

      {bookmarkedArticles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              When you find articles you want to read later, click the bookmark icon to save them here.
            </p>
            <Button asChild>
              <Link href="/">Browse Articles</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarkedArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-2/3 p-4">
                  <div className="flex justify-between items-start">
                    <Badge className="mb-2">{article.category}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveBookmark(article.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove bookmark</span>
                    </Button>
                  </div>
                  <Link href={`/article/${article.id}`}>
                    <h3 className="font-bold text-lg hover:text-[#FAD440] transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-2">Saved {article.date}</p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/article/${article.id}`}>Read Article</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
