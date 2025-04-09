"use client"

import Link from "next/link"
import { Bell, BookmarkPlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { MainNav } from "@/components/main-nav"
import { BreakingNewsCarousel } from "@/components/breaking-news-carousel"
import { FeaturedArticle } from "@/components/featured-article"
import { ArticleList } from "@/components/article-list"
import { WeatherWidget } from "@/components/weather-widget"
import { UserAccountNav } from "@/components/user-account-nav"
import { StockTicker } from "@/components/stock-ticker"
import { AppDownload } from "@/components/app-download"
import { VideoArticle } from "@/components/video-article"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { getCategories } from "@/lib/appwrite"

export default function Home() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [categories, setCategories] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("latest")

  useEffect(() => {
    // Fetch categories from Appwrite
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleSubscribe = () => {
    if (!user) {
      addToast("Please sign in to subscribe to notifications", "info")
    } else {
      addToast("You are now subscribed to breaking news alerts", "success")
    }
  }

  const handlePremiumClick = () => {
    if (!user) {
      addToast("Please sign in to access premium content", "info")
    } else if (user.isPremium) {
      addToast("You already have premium access", "info")
    } else {
      addToast("Redirecting to premium subscription page", "info")
    }
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
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-[200px] pl-8 bg-white text-black" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-black text-white hover:bg-black/80"
                onClick={handleSubscribe}
              >
                <Bell className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
              <UserAccountNav />
            </div>
          </div>
        </div>
        <MainNav />
      </header>

      {/* Stock Ticker */}
      <StockTicker />

      <main className="flex-1">
        <section className="py-6 bg-black text-white">
          <div className="container">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#FAD440]">BREAKING NEWS</h2>
              <Badge variant="outline" className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">
                LIVE
              </Badge>
            </div>
            <BreakingNewsCarousel />
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            {/* Video Article */}
            <VideoArticle />
          </div>
        </section>

        <section className="py-8">
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FeaturedArticle />

              <Tabs defaultValue="latest" className="mt-8">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="technology">Technology</TabsTrigger>
                </TabsList>
                <TabsContent value="latest" className="space-y-4 mt-4">
                  <ArticleList limit={6} />
                </TabsContent>
                <TabsContent value="business" className="space-y-4 mt-4">
                  <ArticleList category="business" limit={6} />
                </TabsContent>
                <TabsContent value="technology" className="space-y-4 mt-4">
                  <ArticleList category="technology" limit={6} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <WeatherWidget />

              <AppDownload />

              <Card>
                <CardHeader className="bg-[#FAD440] text-black">
                  <CardTitle>Newsletter</CardTitle>
                  <CardDescription className="text-black/70">Get the latest news in your inbox</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <NewsletterSignup />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {categories.length > 0
                    ? categories.slice(0, 6).map((category) => (
                        <Link
                          key={category.$id}
                          href={`/category/${category.slug}`}
                          className="flex items-center p-2 rounded-md hover:bg-muted"
                        >
                          {category.name}
                        </Link>
                      ))
                    : ["Politics", "Business", "Technology", "Sports", "Entertainment", "Health"].map((category) => (
                        <Link
                          key={category}
                          href={`/category/${category.toLowerCase()}`}
                          className="flex items-center p-2 rounded-md hover:bg-muted"
                        >
                          {category}
                        </Link>
                      ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-black text-white">
                  <CardTitle>Featured Jobs</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {[
                    { title: "Marketing Manager", company: "Orange Botswana", location: "Gaborone" },
                    { title: "Senior Software Engineer", company: "Botswana Innovation Hub", location: "Gaborone" },
                  ].map((job, i) => (
                    <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline">Full-time</Badge>
                        <Link href="/jobs/1" className="text-sm text-[#FAD440] hover:underline">
                          View Job
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Link href="/jobs" className="text-sm hover:underline w-full text-center">
                    View all jobs
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-8 bg-muted">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Weather",
                "Entertainment",
                "Sports",
                "Education",
                "Lifestyle",
                "Real Estate",
                "Technology",
                "Health",
                "Politics",
                "Business",
                "Science",
                "Travel",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{category}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Latest updates</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Properties</h2>
              <Link href="/properties" className="text-[#FAD440] hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Modern Apartment",
                  location: "Gaborone, Phase 4",
                  price: "P1,250,000",
                  beds: 3,
                  baths: 2,
                  sqft: 120,
                },
                {
                  title: "Family Home",
                  location: "Phakalane, Gaborone",
                  price: "P2,800,000",
                  beds: 4,
                  baths: 3,
                  sqft: 250,
                },
                {
                  title: "Luxury Villa",
                  location: "Broadhurst, Gaborone",
                  price: "P3,500,000",
                  beds: 5,
                  baths: 4,
                  sqft: 320,
                },
              ].map((property, i) => (
                <Card key={i}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={`/placeholder.svg?height=200&width=400`}
                      alt="Property"
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-[#FAD440] text-black">For Sale</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg">{property.title}</h3>
                    <p className="text-muted-foreground">{property.location}</p>
                    <p className="font-bold mt-2">{property.price}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft} m²</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Link href="/tickets" className="text-[#FAD440] hover:underline">
                View all tickets
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Botswana International Music Festival",
                  location: "National Stadium, Gaborone",
                  date: "June 15, 2025",
                  time: "7:00 PM",
                  price: "P150 - P450",
                  category: "Music",
                },
                {
                  title: "Gaborone International Trade Fair",
                  location: "Fairgrounds, Gaborone",
                  date: "August 25, 2025",
                  time: "9:00 AM",
                  price: "P80 - P120",
                  category: "Business",
                },
                {
                  title: "Maun Cultural Festival",
                  location: "Maun Sports Complex",
                  date: "July 10, 2025",
                  time: "10:00 AM",
                  price: "P100 - P200",
                  category: "Culture",
                },
              ].map((event, i) => (
                <Card key={i}>
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={`/placeholder.svg?height=200&width=400`}
                      alt="Event"
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-2 right-2 bg-[#FAD440] text-black">{event.category}</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-muted-foreground">{event.location}</p>
                    <p className="mt-2">
                      {event.date} • {event.time}
                    </p>
                    <p className="font-bold mt-2">{event.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80" asChild>
                      <Link href="/tickets/1">Get Tickets</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 bg-black text-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#FAD440] mb-4">Stay Informed</h2>
                <p className="mb-6">
                  Subscribe to our premium content and get exclusive access to in-depth analysis, special reports, and
                  personalized news feeds about Botswana and beyond.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookmarkPlus className="h-5 w-5 text-[#FAD440]" />
                    <span>Bookmark articles for later reading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#FAD440]" />
                    <span>Get breaking news alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-[#FAD440]" />
                    <span>Access our complete article archive</span>
                  </div>
                </div>
                <Button className="mt-6 bg-[#FAD440] text-black hover:bg-[#FAD440]/80" onClick={handlePremiumClick}>
                  Join Premium
                </Button>
              </div>
              <div className="bg-white text-black p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Sign up for our daily newsletter</h3>
                <NewsletterSignup />
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
