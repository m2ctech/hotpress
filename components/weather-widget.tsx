"use client"

import { useState } from "react"
import { Cloud, CloudRain, Sun, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function WeatherWidget() {
  const [location, setLocation] = useState("Gaborone")

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle>Weather</CardTitle>
          <Sun className="h-6 w-6 text-yellow-300" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm"
          />
          <Button size="sm" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold">{location}</h3>
          <div className="flex justify-center my-2">
            <Sun className="h-12 w-12 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">31°C</p>
          <p className="text-sm text-muted-foreground">Sunny</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="p-2">
            <Cloud className="h-5 w-5 mx-auto mb-1" />
            <p className="font-medium">Mon</p>
            <p>29°C</p>
          </div>
          <div className="p-2">
            <CloudRain className="h-5 w-5 mx-auto mb-1" />
            <p className="font-medium">Tue</p>
            <p>27°C</p>
          </div>
          <div className="p-2">
            <Sun className="h-5 w-5 mx-auto mb-1" />
            <p className="font-medium">Wed</p>
            <p>32°C</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
