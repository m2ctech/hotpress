"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Ticket, Download, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

// Mock ticket data
const tickets = [
  {
    id: "T12345",
    eventName: "Taylor Swift: The Eras Tour",
    venue: "Madison Square Garden, New York",
    date: "June 15, 2025",
    time: "7:00 PM",
    ticketType: "Floor Seats",
    quantity: 2,
    price: "$250.00",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "T12346",
    eventName: "NBA Finals Game 5",
    venue: "Crypto.com Arena, Los Angeles",
    date: "June 18, 2025",
    time: "6:30 PM",
    ticketType: "Section 112, Row 10",
    quantity: 3,
    price: "$350.00",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "T12347",
    eventName: "Hamilton: An American Musical",
    venue: "Richard Rodgers Theatre, New York",
    date: "July 10, 2025",
    time: "8:00 PM",
    ticketType: "Orchestra, Row F",
    quantity: 2,
    price: "$299.00",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "T12348",
    eventName: "Coldplay: Music of the Spheres Tour",
    venue: "Wembley Stadium, London",
    date: "April 22, 2025",
    time: "7:30 PM",
    ticketType: "General Admission",
    quantity: 4,
    price: "$120.00",
    status: "past",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "T12349",
    eventName: "Dave Chappelle Live",
    venue: "The Comedy Store, Los Angeles",
    date: "March 12, 2025",
    time: "9:00 PM",
    ticketType: "VIP Package",
    quantity: 2,
    price: "$150.00",
    status: "past",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function UserTicketsPage() {
  const { user } = useAuth()
  const [selectedTicket, setSelectedTicket] = useState(null)

  if (!user) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your tickets</h1>
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets
              .filter((ticket) => ticket.status === "upcoming")
              .map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <img
                        src={ticket.image || "/placeholder.svg"}
                        alt={ticket.eventName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3 p-4">
                      <h3 className="font-bold text-lg">{ticket.eventName}</h3>
                      <div className="space-y-1 mt-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {ticket.date}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {ticket.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {ticket.venue}
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge variant="outline">{ticket.ticketType}</Badge>
                          <p className="text-sm mt-1">Qty: {ticket.quantity}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80"
                              onClick={() => setSelectedTicket(ticket)}
                            >
                              <Ticket className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Ticket Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-[#FAD440]/10 p-4 rounded-lg border border-[#FAD440] text-center">
                                <QrCode className="h-32 w-32 mx-auto mb-2" />
                                <p className="font-bold">{ticket?.id}</p>
                              </div>

                              <div>
                                <h3 className="font-bold text-lg">{ticket?.eventName}</h3>
                                <div className="space-y-1 mt-2">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {ticket?.date} at {ticket?.time}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {ticket?.venue}
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Ticket Type:</span>
                                  <span className="font-medium">{ticket?.ticketType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Quantity:</span>
                                  <span className="font-medium">{ticket?.quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Price:</span>
                                  <span className="font-medium">{ticket?.price}</span>
                                </div>
                              </div>

                              <div className="flex justify-center">
                                <Button className="w-full">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Ticket
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets
              .filter((ticket) => ticket.status === "past")
              .map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden opacity-75">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <img
                        src={ticket.image || "/placeholder.svg"}
                        alt={ticket.eventName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3 p-4">
                      <h3 className="font-bold text-lg">{ticket.eventName}</h3>
                      <div className="space-y-1 mt-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {ticket.date}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {ticket.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {ticket.venue}
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge variant="outline">{ticket.ticketType}</Badge>
                          <p className="text-sm mt-1">Qty: {ticket.quantity}</p>
                        </div>
                        <Badge variant="secondary">Past Event</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
