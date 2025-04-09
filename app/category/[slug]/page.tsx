"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { ArticleList } from "@/components/article-list"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { useNotifications } from "@/contexts/notification-context"

// GNews categories: general, world, nation, business, technology, entertainment, sports, science, health
const CATEGORY_MAPPING: Record<string, string> = {
  news: "general",
  world: "world",
  politics: "nation",
  business: "business",
  technology: "technology",
  entertainment: "entertainment",
  sports: "sports",
  science: "science",
  health: "health",
  // Add more mappings as needed
}

export default function CategoryPage() {
  const params = useParams()
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const slug = params?.slug as string
  const [activeTab, setActiveTab] = useState("latest")

  // Format the category name for display (e.g., "real-estate" -> "Real Estate")
  const categoryName = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : ""

  // Map the slug to a GNews category
  const gnewsCategory = CATEGORY_MAPPING[slug] || "general"

  // Check if this category is in user's interests
  const isUserInterested = user?.preferences?.interests?.includes(categoryName)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50">
        <div className="bg-[#FAD440] py-2">
          <div className="container flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-black">
              HOT PRESS MEDIA
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-[200px] pl-8 bg-white text-black" />
              </div>
              <UserAccountNav />
            </div>
          </div>
        </div>
        <MainNav />
      </header>

      <main className="flex-1">
        <section className="bg-black text-white py-8">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h1>
            <p className="text-gray-300 max-w-3xl">
              Stay informed with the latest news, analysis, and in-depth reporting on {categoryName.toLowerCase()}.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-3/4">
                <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab}>
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="latest">Latest</TabsTrigger>
                      <TabsTrigger value="trending">Trending</TabsTrigger>
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </div>

                  <TabsContent value="latest" className="space-y-6">
                    <ArticleList category={gnewsCategory} />
                  </TabsContent>

                  <TabsContent value="trending" className="space-y-6">
                    <ArticleList category={gnewsCategory} />
                  </TabsContent>

                  <TabsContent value="featured" className="space-y-6">
                    <ArticleList category={gnewsCategory} />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="md:w-1/4 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-4">Popular in {categoryName}</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3">
                          <div className="font-bold text-muted-foreground">{i}</div>
                          <div>
                            <Link href={`/article/${i}`} className="font-medium hover:text-[#FAD440] transition-colors">
                              {i === 1
                                ? "Latest developments in " + categoryName
                                : i === 2
                                  ? "How " + categoryName + " is changing in 2025"
                                  : "Top " + categoryName + " stories this week"}
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1">
                              {i === 1 ? "2 hours ago" : i === 2 ? "Yesterday" : "3 days ago"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-4">Related Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(CATEGORY_MAPPING)
                        .filter((cat) => cat !== slug)
                        .slice(0, 6)
                        .map((category) => (
                          <Link key={category} href={`/category/${category}`}>
                            <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Badge>
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {user && isUserInterested && (
                  <Card className="bg-[#FAD440]/10 border-[#FAD440]">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">Personalized For You</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We're showing you more {categoryName} content based on your interests.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Adjust Preferences
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-[#FAD440] mb-2">HOT PRESS MEDIA</h3>
              <p className="text-sm text-gray-300">Your trusted source for {categoryName.toLowerCase()} news</p>
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
