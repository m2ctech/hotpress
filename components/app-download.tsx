"use client"

import { useState } from "react"
import { QrCode, Download, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function AppDownload() {
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null)

  const detectPlatform = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/android/i.test(userAgent)) {
      setPlatform("android")
      window.open("https://play.google.com/store/apps/details?id=com.hotpressmedia.app", "_blank")
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform("ios")
      window.open("https://apps.apple.com/app/hot-press-media/id1234567890", "_blank")
    } else {
      // Show QR code dialog for desktop users
      document.getElementById("open-qr-dialog")?.click()
    }
  }

  return (
    <Card className="overflow-hidden border-[#FAD440]">
      <CardHeader className="bg-[#FAD440] text-black pb-2">
        <CardTitle className="flex items-center">
          <Smartphone className="mr-2 h-5 w-5" />
          Get Our Mobile App
        </CardTitle>
        <CardDescription className="text-black/70">Stay updated on the go</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-4">
          <p className="text-sm">
            Download the Hot Press Media app for breaking news alerts, personalized content, and exclusive features.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="flex-1 bg-black text-white hover:bg-black/80"
              onClick={() =>
                window.open("https://play.google.com/store/apps/details?id=com.hotpressmedia.app", "_blank")
              }
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Google Play
            </Button>
            <Button
              className="flex-1 bg-black text-white hover:bg-black/80"
              onClick={() => window.open("https://apps.apple.com/app/hot-press-media/id1234567890", "_blank")}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              App Store
            </Button>
          </div>

          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" id="open-qr-dialog">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Download Our App</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center py-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <QrCode className="h-48 w-48" />
                  </div>
                  <p className="text-sm text-center mt-4">
                    Scan this QR code with your phone camera to download the Hot Press Media app
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="w-[48%]"
                    onClick={() =>
                      window.open("https://play.google.com/store/apps/details?id=com.hotpressmedia.app", "_blank")
                    }
                  >
                    Android
                  </Button>
                  <Button
                    variant="outline"
                    className="w-[48%]"
                    onClick={() => window.open("https://apps.apple.com/app/hot-press-media/id1234567890", "_blank")}
                  >
                    iOS
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Button className="w-full bg-[#FAD440] text-black hover:bg-[#FAD440]/80" onClick={detectPlatform}>
            <Download className="mr-2 h-4 w-4" />
            Download Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
