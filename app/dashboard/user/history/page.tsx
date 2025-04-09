"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { History, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "New Legislation Aims to Reform Healthcare System",
    excerpt: "Lawmakers propose sweeping changes to improve healthcare accessibility and affordability.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Politics",
    date: "5 hours ago",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "International Trade Negotiations Enter Final Phase",
    excerpt: "Key economic powers work to finalize agreement on tariffs and market access.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    date: "1 day ago",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Tech Giant Announces Record Quarterly Profits",
    excerpt: "Company exceeds analyst expectations with strong performance in cloud services.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    date: "3 hours ago",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Startup Raises $50 Million in Series B Funding",
    excerpt: "Innovative fintech platform attracts major investment to expand global operations.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    date: "1 day ago",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Market Analysis: Economic Recovery Shows Signs of Slowing",
    excerpt: "Experts warn of potential challenges ahead despite recent growth indicators.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Business",
    date: "2 days ago",
    readTime: "9 min read",
  },
  {
    id: 7,
    title: "Revolutionary AI System Can Predict Protein Structures",
    excerpt: "Breakthrough technology promises to accelerate drug discovery and medical research.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    date: "4 hours ago",
    readTime: "6 min read",
  },
  {
    id: 8,
    title: "New Smartphone Features Advanced Camera Technology",
    excerpt: "Latest flagship device pushes boundaries with computational photography innovations.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    date: "1 day ago",
    readTime: "5 min read",
  },
]

export default function ReadingHistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    if (!user) {
      addToast("Please sign in to view your reading history", "error")
      router.push("/auth/login")
    }
  }, [user, router, addToast])

  if (!user) {
    return null
  }

  // Get reading history articles
  const historyArticles = ARTICLES.filter(article => 
    user.readingHistory?.includes(article.id)
  )

  // Group articles by date
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const todayArticles = historyArticles.filter(article => 
    article.date.includes("hour") || article.date === "Today"
  )
  
  const yesterdayArticles = historyArticles.filter(article => 
    article.date.includes("1 day")
  )
  
  const olderArticles = historyArticles.filter(article => 
    !todayArticles.includes(article) && !yesterdayArticles.includes(article)
  )

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reading History</h1>
          <p className="text-muted-foreground">Articles you've recently read</p>
        </div>
        <Button variant="outline">Clear History</Button>
      </div>

      {historyArticles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">No reading history</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Your reading history will appear here as you read articles on Daily Pulse.
            </p>
            <Button asChild>
              <Link href="/">Browse Articles</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {todayArticles.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Today
              </h2>
              <div className="space-y-4">
                {todayArticles.map(article => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/4">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:w-3/4 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="font-bold text-lg hover:text-[#FAD440] transition-colors">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                          {article.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Read {article.date}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {yesterdayArticles.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Yesterday
              </h2>
              <div className="space-y-4">
                {yesterdayArticles.map(article => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/4">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:w-3/4 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="font-bold text-lg hover:text-[#FAD440] transition-colors">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                          {article.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Read {article.date}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {olderArticles.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Earlier
              </h2>
              <div className="space-y-4">
                {olderArticles.map(article => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/4">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:w-3/4 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="font-bold text-lg hover:text-[#FAD440] transition-colors">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                          {article.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Read {article.date}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
