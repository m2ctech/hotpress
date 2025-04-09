"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  { name: "News", href: "/category/news" },
  { name: "Weather", href: "/category/weather" },
  { name: "Entertainment", href: "/category/entertainment" },
  { name: "Sports", href: "/category/sports" },
  { name: "Education", href: "/category/education" },
  { name: "Lifestyle", href: "/category/lifestyle" },
  { name: "Real Estate", href: "/category/real-estate" },
  { name: "Tickets", href: "/tickets" },
  { name: "Jobs", href: "/jobs" },
  { name: "Properties", href: "/properties" },
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <div className="hidden md:flex space-x-1">
            {categories.slice(0, 7).map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md"
              >
                {category.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm font-medium text-gray-900">
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.slice(7).map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden py-2 px-4 space-y-1 border-t">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
