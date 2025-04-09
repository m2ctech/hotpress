"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Calendar, Clock, MapPin, Ticket, ChevronLeft, Plus, Minus, Share2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { useToast } from "@/hooks/use-toast"

// Mock event data
const event = {
  id: 1,
  title: "Taylor Swift: The Eras Tour",
  venue: "Madison Square Garden",
  address: "4 Pennsylvania Plaza, New York, NY 10001",
  date: "June 15, 2025",
  time: "7:00 PM",
  doors: "5:30 PM",
  description:
    "Experience Taylor Swift's record-breaking Eras Tour, a journey through all of her musical eras. This three-hour musical experience features songs from across her entire catalog, elaborate stage designs, multiple costume changes, and surprise acoustic performances.",
  image: "/placeholder.svg?height=500&width=1000",
  category: "Music",
  priceRanges: [
    { type: "General Admission", price: 150, available: 245 },
    { type: "Floor Seats", price: 250, available: 120 },
    { type: "VIP Package", price: 450, available: 30 },
  ],
  relatedEvents: [
    { id: 2, title: "Coldplay: Music of the Spheres Tour", date: "July 22, 2025", venue: "Wembley Stadium, London" },
    { id: 3, title: "Beyoncé: Renaissance World Tour", date: "August 5, 2025", venue: "SoFi Stadium, Los Angeles" },
    { id: 4, title: "Adele: Weekend with Adele", date: "September 10, 2025", venue: "Caesars Palace, Las Vegas" },
  ],
}

export default function EventDetailPage() {
  const params = useParams()
  const { addToast } = useToast()
  const [selectedTicketType, setSelectedTicketType] = useState(event.priceRanges[0])
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    if (quantity < 8) setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const addToCart = () => {
    addToast(`${quantity} ${selectedTicketType.type} tickets added to cart`, "success")
  }

  const totalPrice = selectedTicketType.price * quantity
  const serviceFee = totalPrice * 0.15
  const total = totalPrice + serviceFee

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
        <div className="bg-black text-white py-6">
          <div className="container">
            <Link href="/tickets" className="flex items-center text-sm hover:text-[#FAD440] transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to all events
            </Link>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {event.date}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {event.time} (Doors: {event.doors})
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.venue}
                </div>
                <Badge className="bg-[#FAD440] text-black">{event.category}</Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">About This Event</h2>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-bold mb-2">Venue Information</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden">
                      <img
                        src="/placeholder.svg?height=100&width=100"
                        alt={event.venue}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{event.venue}</h3>
                      <p className="text-muted-foreground">{event.address}</p>
                      <Button variant="link" className="p-0 h-auto mt-1 text-[#FAD440]">
                        View Venue Details
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {event.relatedEvents.map((relatedEvent) => (
                      <Card key={relatedEvent.id}>
                        <CardContent className="p-4">
                          <h3 className="font-bold">{relatedEvent.title}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {relatedEvent.date}
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {relatedEvent.venue}
                            </div>
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2 text-[#FAD440]" asChild>
                            <Link href={`/tickets/${relatedEvent.id}`}>View Event</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Get Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Select Ticket Type</h3>
                    <div className="space-y-2">
                      {event.priceRanges.map((ticketType) => (
                        <div
                          key={ticketType.type}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${
                            selectedTicketType.type === ticketType.type
                              ? "border-[#FAD440] bg-[#FAD440]/10"
                              : "hover:border-gray-400"
                          }`}
                          onClick={() => setSelectedTicketType(ticketType)}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">{ticketType.type}</span>
                            <span className="font-bold">${ticketType.price}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {ticketType.available} tickets available
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Quantity</h3>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-none"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center font-medium">{quantity}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-none"
                        onClick={incrementQuantity}
                        disabled={quantity >= 8}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Maximum 8 tickets per order</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        Price ({quantity} × ${selectedTicketType.price})
                      </span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80" onClick={addToCart}>
                    <Ticket className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Now
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
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
