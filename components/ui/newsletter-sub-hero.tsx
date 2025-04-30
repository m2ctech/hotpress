"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import newsletterIllustration from "@/assets/images/newsillust.png" // <-- make sure to add an illustration


export default function NewsletterSubHero() {
  const [method, setMethod] = useState("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>(["backyard-bliss"])

  const newsletters = [
    {
      id: "backyard-bliss",
      name: "Backyard Bliss",
      description: "Tips and inspiration for backyard gardening enthusiasts",
    },
    {
      id: "tech-trends",
      name: "Tech Trends",
      description: "Stay updated with the latest in technology",
    },
    {
      id: "health-wellness",
      name: "Health & Wellness",
      description: "Advice for a healthier lifestyle",
    },
    {
      id: "finance-insights",
      name: "Finance Insights",
      description: "Personal finance tips and market updates",
    },
  ]

  const handleNewsletterToggle = (newsletterId: string) => {
    setSelectedNewsletters((prev) =>
      prev.includes(newsletterId) ? prev.filter((id) => id !== newsletterId) : [...prev, newsletterId],
    )
  }

  const handleSubscribe = () => {
    // Add your subscription logic here
    console.log("Subscribing with:", {
      method,
      email,
      phone,
      newsletters: selectedNewsletters,
    })
  }

  return (
    <section className="bg-black text-white py-10 ">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed, Always.</h1>
          <p className="text-muted-foreground mb-6">
            Subscribe to newsletters that matter to you — gardening, technology, health, and more. Trusted by 10,000+
            readers across Botswana.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Choose your newsletters:</h3>
              <div className="space-y-3 p-4 rounded-md bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                {newsletters.map((newsletter) => (
                  <div key={newsletter.id} className="flex items-start space-x-2 ">
                    <Checkbox
                      id={newsletter.id}
                      checked={selectedNewsletters.includes(newsletter.id)}
                      onCheckedChange={() => handleNewsletterToggle(newsletter.id)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={newsletter.id} className="font-medium cursor-pointer">
                        {newsletter.name}
                      </Label>
                      <p className="text-sm text-gray-400">{newsletter.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Input
              type="email"
              placeholder="Enter your email"
              className="text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <RadioGroup defaultValue="email" className="flex gap-4" onValueChange={(val) => setMethod(val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp">WhatsApp</Label>
              </div>
            </RadioGroup>

            {(method === "sms" || method === "whatsapp") && (
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            <Button onClick={handleSubscribe} className="w-full md:w-auto bg-[#FAD440] text-black hover:bg-[#E5C230]">
              Subscribe
            </Button>

            <p className="text-sm text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src={newsletterIllustration}
            alt="Newsletter Illustration"
            width={500}
            height={300}
            className="max-w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  )
}
