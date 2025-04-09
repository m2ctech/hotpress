"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart, FileText, Home, ImageIcon, Menu, MessageSquare, PenTool, Plus, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { StockTicker } from "@/components/stock-ticker"

// Mock articles data
const articles = [
  {
    id: 1,
    title: "Botswana's Renewable Energy Initiatives in Rural Areas",
    excerpt: "Exploring how solar power is transforming access to electricity in remote villages.",
    status: "draft",
    lastEdited: "2 days ago",
    wordCount: 1200,
  },
  {
    id: 2,
    title: "The Digital Transformation of Botswana's Public Services",
    excerpt: "How government agencies are embracing technology to improve service delivery.",
    status: "draft",
    lastEdited: "1 day ago",
    wordCount: 1800,
  },
  {
    id: 3,
    title: "Remote Work Trends in Botswana's Corporate Sector",
    excerpt: "How companies are adapting to the new normal of distributed teams.",
    status: "draft",
    lastEdited: "3 hours ago",
    wordCount: 950,
  },
  {
    id: 4,
    title: "Botswana's Role in Regional Climate Change Initiatives",
    excerpt: "A comprehensive analysis of the country's environmental policies and commitments.",
    status: "published",
    publishDate: "May 15, 2025",
    views: 15200,
  },
  {
    id: 5,
    title: "Cryptocurrency Adoption in Botswana: Challenges and Opportunities",
    excerpt: "How digital currencies are gaining traction despite regulatory hurdles.",
    status: "published",
    publishDate: "May 10, 2025",
    views: 12300,
  },
  {
    id: 6,
    title: "The Impact of AI on Botswana's Media Landscape",
    excerpt: "Exploring how artificial intelligence is changing news reporting and consumption.",
    status: "published",
    publishDate: "May 5, 2025",
    views: 28500,
  },
  {
    id: 7,
    title: "Healthcare Innovation in Botswana: Telemedicine Expansion",
    excerpt: "The latest advancements in remote healthcare delivery systems across the country.",
    status: "published",
    publishDate: "April 28, 2025",
    views: 9800,
  },
  {
    id: 8,
    title: "Botswana's Mining Sector: Q2 2025 Performance Report",
    excerpt: "Analysis of market trends and performance in the vital mining industry.",
    status: "scheduled",
    scheduledDate: "June 1, 2025",
    scheduledTime: "9:00 AM",
  },
  {
    id: 9,
    title: "Electric Vehicle Infrastructure Development in Botswana",
    excerpt: "Examining the growing investment in charging stations and EV-friendly policies.",
    status: "scheduled",
    scheduledDate: "May 25, 2025",
    scheduledTime: "10:00 AM",
  },
]

// Mock comments data
const comments = [
  {
    id: 1,
    author: "Tebogo Moeng",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Great article! I especially appreciated the in-depth analysis of the economic implications for our country.",
    articleTitle: "Botswana's Role in Regional Climate Change Initiatives",
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Lesego Kgotla",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "This was very informative. I'd love to see a follow-up piece on how these technologies are being implemented in rural Botswana.",
    articleTitle: "Botswana's Renewable Energy Initiatives in Rural Areas",
    time: "5 hours ago",
  },
  {
    id: 3,
    author: "Katlego Motswagole",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I found some of your points debatable, particularly regarding the regulatory framework. Would love to discuss further.",
    articleTitle: "Cryptocurrency Adoption in Botswana: Challenges and Opportunities",
    time: "1 day ago",
  },
]

export default function JournalistDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const { addToast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Check if user is a journalist, if not redirect to home
    if (user && user.role !== "journalist") {
      addToast("Access denied. Only journalists can access this dashboard.", "error")
      router.push("/")
    }
  }, [user, router, addToast])

  const handlePublish = (articleId: number) => {
    addToast("Article published successfully!", "success")
    // In a real app, this would update the article status in the database
  }

  const handleSchedule = (articleId: number) => {
    addToast("Article scheduled for publication", "success")
    // In a real app, this would update the article status in the database
  }

  const handleDeleteDraft = (articleId: number) => {
    addToast("Draft deleted", "info")
    // In a real app, this would delete the article from the database
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold text-black">
              HOT PRESS MEDIA
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home className="h-5 w-5 mr-2" />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText className="h-5 w-5 mr-2" />
                  My Articles
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/journalist/create">
                    <PenTool className="h-5 w-5 mr-2" />
                    Create New
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Comments
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BarChart className="h-5 w-5 mr-2" />
                  Analytics
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Media Library
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-5 w-5 mr-2" />
                  {user?.name || "Journalist"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">Back to News</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          {/* Stock Ticker for financial news reference */}
          <div className="mb-6">
            <StockTicker className="rounded-lg" />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Journalist Dashboard</h1>
            <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80" asChild>
              <Link href="/dashboard/journalist/create">
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{articles.length}</div>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">128.5k</div>
                <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{comments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="drafts" className="mb-6">
            <TabsList>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>
            <TabsContent value="drafts" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Draft Articles</CardTitle>
                  <CardDescription>Continue working on your draft articles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles
                      .filter((article) => article.status === "draft")
                      .map((article) => (
                        <div key={article.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Last edited {article.lastEdited} • {article.wordCount} words
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/journalist/create?id=${article.id}`}>Edit</Link>
                            </Button>
                            <Button
                              size="sm"
                              className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80"
                              onClick={() => handlePublish(article.id)}
                            >
                              Publish
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="published" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Published Articles</CardTitle>
                  <CardDescription>View and manage your published articles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles
                      .filter((article) => article.status === "published")
                      .map((article) => (
                        <div key={article.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{article.title}</h3>
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                Published
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Published on {article.publishDate} • {article.views.toLocaleString()} views
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/article/${article.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/journalist/create?id=${article.id}`}>Edit</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="scheduled" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Articles</CardTitle>
                  <CardDescription>Articles scheduled for future publication.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles
                      .filter((article) => article.status === "scheduled")
                      .map((article) => (
                        <div key={article.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{article.title}</h3>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                Scheduled
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Scheduled for {article.scheduledDate} at {article.scheduledTime}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/journalist/create?id=${article.id}`}>Edit</Link>
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handlePublish(article.id)}>
                              Publish Now
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Latest comments on your articles.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <img src={comment.avatar || "/placeholder.svg"} alt="User" className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{comment.author}</p>
                            <p className="text-xs text-muted-foreground">{comment.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">On: {comment.articleTitle}</p>
                          <p className="text-sm mt-1">{comment.content}</p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Articles</CardTitle>
                <CardDescription>Your most viewed articles this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles
                    .filter((article) => article.status === "published")
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, 4)
                    .map((article, index) => (
                      <div key={article.id} className="flex items-center gap-4 p-2">
                        <div className="font-bold text-lg text-muted-foreground">{index + 1}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{article.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{article.views?.toLocaleString()} views</span>
                            <span>{Math.floor(Math.random() * 300)} comments</span>
                            <span>{article.publishDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
