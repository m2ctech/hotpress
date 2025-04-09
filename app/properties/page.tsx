import Link from "next/link"
import { Search, MapPin, Home, Filter, Bath, BedDouble, SquareIcon as SquareFoot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"

const properties = [
  {
    id: 1,
    title: "Modern Apartment with City View",
    location: "New York, NY",
    price: "$450,000",
    type: "For Sale",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Luxury Penthouse",
    location: "Miami, FL",
    price: "$3,500/month",
    type: "For Rent",
    beds: 3,
    baths: 3,
    sqft: 2000,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "Cozy Studio in Downtown",
    location: "Chicago, IL",
    price: "$1,800/month",
    type: "For Rent",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "Family Home with Garden",
    location: "Austin, TX",
    price: "$650,000",
    type: "For Sale",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "Waterfront Condo",
    location: "Seattle, WA",
    price: "$520,000",
    type: "For Sale",
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    title: "Downtown Loft",
    location: "Portland, OR",
    price: "$2,200/month",
    type: "For Rent",
    beds: 1,
    baths: 1,
    sqft: 950,
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function PropertiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50">
        <div className="bg-[#FAD440] py-2">
          <div className="container flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-black">
              DAILY PULSE
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="bg-black text-white hover:bg-black/80">
                List Property
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex bg-white text-black hover:bg-white/80">
                Sign In
              </Button>
            </div>
          </div>
        </div>
        <MainNav />
      </header>

      <main className="flex-1">
        <section className="bg-black text-white py-12">
          <div className="container text-center max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Property</h1>
            <p className="text-gray-300 mb-8">Browse thousands of properties for sale and rent across the country.</p>

            <div className="bg-white p-4 rounded-lg">
              <Tabs defaultValue="buy">
                <TabsList className="mb-4">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="rent">Rent</TabsTrigger>
                  <TabsTrigger value="sold">Sold</TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="City, neighborhood, or address" className="pl-9 bg-white text-black" />
                    </div>
                    <div className="relative flex-1">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Property type" className="pl-9 bg-white text-black" />
                    </div>
                    <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Search</Button>
                  </div>
                </TabsContent>

                <TabsContent value="rent" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="City, neighborhood, or address" className="pl-9 bg-white text-black" />
                    </div>
                    <div className="relative flex-1">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Price range" className="pl-9 bg-white text-black" />
                    </div>
                    <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Search</Button>
                  </div>
                </TabsContent>

                <TabsContent value="sold" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="City, neighborhood, or address" className="pl-9 bg-white text-black" />
                    </div>
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Sold date" className="pl-9 bg-white text-black" />
                    </div>
                    <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Search</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Property Type</h3>
                      <div className="space-y-2">
                        {["House", "Apartment", "Condo", "Townhouse", "Land"].map((type) => (
                          <label key={type} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{type}</span>
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

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Bedrooms</h3>
                      <div className="flex gap-2">
                        {["Any", "1+", "2+", "3+", "4+"].map((beds) => (
                          <Button key={beds} variant="outline" size="sm" className="flex-1">
                            {beds}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Bathrooms</h3>
                      <div className="flex gap-2">
                        {["Any", "1+", "2+", "3+", "4+"].map((baths) => (
                          <Button key={baths} variant="outline" size="sm" className="flex-1">
                            {baths}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">More Filters</h3>
                      <div className="space-y-2">
                        {["Garage", "Pool", "Air Conditioning", "Furnished", "Pet Friendly"].map((feature) => (
                          <label key={feature} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Apply Filters</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-3/4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Available Properties</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Sort
                    </Button>
                    <Tabs defaultValue="grid">
                      <TabsList>
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                        <TabsTrigger value="map">Map</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-[#FAD440] text-black">{property.type}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                        <p className="font-bold text-lg mt-2">{property.price}</p>
                        <div className="flex justify-between mt-4 text-sm">
                          <div className="flex items-center">
                            <BedDouble className="h-4 w-4 mr-1" />
                            {property.beds} Beds
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            {property.baths} Baths
                          </div>
                          <div className="flex items-center">
                            <SquareFoot className="h-4 w-4 mr-1" />
                            {property.sqft} sqft
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/30 p-4">
                        <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Properties</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-[#FAD440] mb-2">DAILY PULSE PROPERTIES</h3>
              <p className="text-sm text-gray-300">Find your dream home</p>
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
