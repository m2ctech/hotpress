import Link from "next/link"
import { Search, MapPin, Briefcase, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "New York, NY",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Global Media",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Creative Solutions",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$80 - $100 per hour",
    posted: "3 days ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Analytics Inc",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85,000 - $105,000",
    posted: "Just now",
    logo: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 5,
    title: "Content Writer",
    company: "Daily Pulse Media",
    location: "Remote",
    type: "Part-time",
    salary: "$30 - $45 per hour",
    posted: "5 days ago",
    logo: "/placeholder.svg?height=50&width=50",
  },
]

export default function JobsPage() {
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
                Post a Job
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-gray-300 mb-8">
              Browse thousands of job listings from top companies and apply in minutes.
            </p>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Job title, keywords, or company" className="pl-9 bg-white text-black" />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Location or remote" className="pl-9 bg-white text-black" />
                </div>
                <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Search Jobs</Button>
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
                      <h3 className="font-medium mb-2">Job Type</h3>
                      <div className="space-y-2">
                        {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map((type) => (
                          <label key={type} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Experience Level</h3>
                      <div className="space-y-2">
                        {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
                          <label key={level} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Salary Range</h3>
                      <div className="space-y-2">
                        {["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"].map((range) => (
                          <label key={range} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{range}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">Apply Filters</Button>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">For Employers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Reach thousands of qualified candidates by posting your job on Daily Pulse Jobs.
                    </p>
                    <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Post a Job</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-3/4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Available Jobs</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Sort
                    </Button>
                    <Tabs defaultValue="list">
                      <TabsList>
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-bold text-lg">{job.title}</h3>
                                <p className="text-muted-foreground">{job.company}</p>
                              </div>
                              <Badge variant="outline">{job.type}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.salary}
                              </div>
                              <div>Posted {job.posted}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardFooter className="bg-muted/30 flex justify-between">
                        <Button variant="ghost" size="sm">
                          Save Job
                        </Button>
                        <Button className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80">Apply Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Jobs</Button>
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
              <h3 className="text-xl font-bold text-[#FAD440] mb-2">DAILY PULSE JOBS</h3>
              <p className="text-sm text-gray-300">Find your next career opportunity</p>
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
