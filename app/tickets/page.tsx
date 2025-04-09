import Link from "next/link"
import { Search, Calendar, MapPin, Ticket, Filter, Music, Film, Theater, Gamepad, Mic, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { HeadphonesIcon } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Taylor Swift: The Eras Tour",
    venue: "Madison Square Garden, New York",
    date: "June 15, 2025",
    time: "7:00 PM",
    price: "$150 - $450",
    category: "Music",
    image: "/placeholder.svg?height=300&width=500",
    icon: Music,
  },
  {
    id: 2,
    title: "Hamilton: An American Musical",
    venue: "Richard Rodgers Theatre, New York",
    date: "July 10, 2025",
    time: "8:00 PM",
    price: "$199 - $699",
    category: "Theater",
    image: "/placeholder.svg?height=300&width=500",
    icon: Theater,
  },
  {
    id: 3,
    title: "NBA Finals Game 5",
    venue: "Crypto.com Arena, Los Angeles",
    date: "June 18, 2025",
    time: "6:30 PM",
    price: "$250 - $1200",
    category: "Sports",
    image: "/placeholder.svg?height=300&width=500",
    icon: Gamepad,
  },
  {
    id: 4,
    title: "Avengers: Secret Wars - Premiere",
    venue: "TCL Chinese Theatre, Los Angeles",
    date: "May 5, 2025",
    time: "7:00 PM",
    price: "$25 - $50",
    category: "Film",
    image: "/placeholder.svg?height=300&width=500",
    icon: Film,
  },
  {
    id: 5,
    title: "Dave Chappelle Live",
    venue: "The Comedy Store, Los Angeles",
    date: "August 12, 2025",
    time: "9:00 PM",
    price: "$85 - $150",
    category: "Comedy",
    image: "/placeholder.svg?height=300&width=500",
    icon: Mic,
  },
  {
    id: 6,
    title: "Coldplay: Music of the Spheres Tour",
    venue: "Wembley Stadium, London",
    date: "July 22, 2025",
    time: "7:30 PM",
    price: "$120 - $350",
    category: "Music",
    image: "/placeholder.svg?height=300&width=500",
    icon: Music,
  },
]

export default function TicketsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50">
        <div className="bg-[#FAD440] py-2">
          <div className="container flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-black">
              DAILY PULSE
            </Link>
            <UserAccountNav />
          </div>
        </div>
        <MainNav />
      </header>

      <main className="flex-1">
        <section className="bg-black text-white py-12">
          <div className="container text-center max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Tickets to Amazing Events</h1>
            <p className="text-gray-300 mb-8">Concerts, sports, theater, comedy, and more - all in one place.</p>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search events, artists, teams..." className="pl-9 bg-white text-black" />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Location" className="pl-9 bg-white text-black" />
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Date" className="pl-9 bg-white text-black" />
                </div>
                <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Search</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Event Type</h3>
                      <div className="space-y-2">
                        {["Concerts", "Sports", "Theater", "Comedy", "Film", "Family"].map((type) => (
                          <label key={type} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Date</h3>
                      <div className="space-y-2">
                        {["Today", "Tomorrow", "This Weekend", "This Week", "This Month"].map((date) => (
                          <label key={date} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{date}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Price Range</h3>
                      <div className="flex gap-2">
                        <Input placeholder="Min" />
                        <Input placeholder="Max" />
                      </div>
                    </div>

                    <Button className="w-full">Apply Filters</Button>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Sell Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Have tickets you can't use? List them for sale on our secure marketplace.
                    </p>
                    <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Sell Your Tickets</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-3/4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Featured Events</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Sort
                    </Button>
                    <Tabs defaultValue="grid">
                      <TabsList>
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full aspect-[3/2] object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-[#FAD440] text-black">{event.category}</Badge>
                        <div className="absolute top-2 left-2 bg-black/70 rounded-full p-2">
                          <event.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.venue}
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date} • {event.time}
                        </div>
                        <p className="font-bold text-lg mt-2">{event.price}</p>
                      </CardContent>
                      <CardFooter className="bg-muted/30 p-4">
                        <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80">
                          <Ticket className="mr-2 h-4 w-4" />
                          Get Tickets
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Events</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why Buy Tickets with Daily Pulse?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer a secure, convenient way to purchase tickets to your favorite events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="bg-[#FAD440] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Ticket className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">100% Guaranteed Tickets</h3>
                  <p className="text-muted-foreground">
                    Valid tickets delivered in time for the event or your money back.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="bg-[#FAD440] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    Your personal and payment information is protected by industry-leading security.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="bg-[#FAD440] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Customer Support</h3>
                  <p className="text-muted-foreground">
                    Our team is available 7 days a week to help with any questions or concerns.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-[#FAD440] mb-2">DAILY PULSE TICKETS</h3>
              <p className="text-sm text-gray-300">Your source for event tickets</p>
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
          <p className="text-sm text-gray-400 text-center">© 2025 Daily Pulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
