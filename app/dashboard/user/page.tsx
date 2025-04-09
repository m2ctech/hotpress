"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Bookmark, Home, Menu, MessageSquare, Settings, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold text-black">
              DAILY PULSE
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
                  <Bookmark className="h-5 w-5 mr-2" />
                  Bookmarks
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Liked Articles
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
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
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
                  Jane Smith
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Upgrade to Premium</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12 days</div>
                <p className="text-xs text-muted-foreground mt-1">Keep reading to maintain your streak!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Articles Read</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">450</div>
                <p className="text-xs text-muted-foreground mt-1">Redeem for rewards</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="recommended" className="mb-6">
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="history">Reading History</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended For You</CardTitle>
                  <CardDescription>Based on your reading preferences and interests.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                        <img
                          src="/placeholder.svg?height=80&width=120"
                          alt="Article thumbnail"
                          className="w-20 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">The Future of Remote Work: How Companies Are Adapting</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            As remote work becomes the new normal, companies are finding innovative ways to maintain
                            culture and productivity.
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Business</span>
                            <span>5 min read</span>
                            <span>2 hours ago</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only">Bookmark article</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bookmarks" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookmarks</CardTitle>
                  <CardDescription>Articles you've saved for later reading.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                        <img
                          src="/placeholder.svg?height=80&width=120"
                          alt="Article thumbnail"
                          className="w-20 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">Understanding the Latest Breakthroughs in Quantum Computing</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            Recent advancements in quantum computing are paving the way for revolutionary changes in
                            technology.
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Technology</span>
                            <span>8 min read</span>
                            <span>Saved 3 days ago</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4 fill-current" />
                          <span className="sr-only">Remove bookmark</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reading History</CardTitle>
                  <CardDescription>Articles you've recently read.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                        <img
                          src="/placeholder.svg?height=80&width=120"
                          alt="Article thumbnail"
                          className="w-20 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">Global Climate Summit Results: What You Need to Know</h3>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Environment</span>
                            <span>6 min read</span>
                            <span>Read yesterday</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="sr-only">Like article</span>
                        </Button>
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
                <CardTitle>Newsletter Subscriptions</CardTitle>
                <CardDescription>Manage your newsletter preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Daily News Digest", description: "Top stories delivered every morning" },
                    { name: "Breaking News Alerts", description: "Immediate updates on major stories" },
                    { name: "Weekly Technology Roundup", description: "Latest in tech every Friday" },
                    { name: "Business Insights", description: "Market analysis and business trends" },
                  ].map((newsletter, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={`newsletter-${i}`} className="font-medium">
                          {newsletter.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{newsletter.description}</p>
                      </div>
                      <Switch id={`newsletter-${i}`} defaultChecked={i < 2} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Badges and rewards you've earned.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Avid Reader", description: "Read 50+ articles", unlocked: true },
                    { name: "Commenter", description: "Left 10+ comments", unlocked: true },
                    { name: "Early Bird", description: "Read news before 8am", unlocked: true },
                    { name: "News Junkie", description: "Read 100+ articles", unlocked: false },
                    { name: "Category Expert", description: "Read 20+ in one category", unlocked: false },
                    { name: "Loyal Reader", description: "30-day streak", unlocked: false },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center ${
                        badge.unlocked ? "bg-white" : "bg-gray-100 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          badge.unlocked ? "bg-[#FAD440]" : "bg-gray-200"
                        }`}
                      >
                        {badge.unlocked ? "🏆" : "🔒"}
                      </div>
                      <h3 className="font-medium text-sm">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
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
