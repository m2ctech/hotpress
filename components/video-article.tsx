"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VideoArticle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play when in view with proper error handling
  useEffect(() => {
    if (!videoRef.current) return

    // Pre-load the video
    videoRef.current.load()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only attempt to play if video exists and is not already playing
            if (videoRef.current && !isPlaying) {
              // Play with error handling
              videoRef.current
                .play()
                .then(() => {
                  setIsPlaying(true)
                })
                .catch((error) => {
                  // Handle play errors gracefully
                  console.log("Video play error:", error)
                  // Don't update state if play failed
                })
            }
          } else {
            // Only pause if video exists and is currently playing
            if (videoRef.current && isPlaying) {
              videoRef.current.pause()
              setIsPlaying(false)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Video play error:", error)
        })
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const enterFullscreen = () => {
    videoRef.current?.requestFullscreen()
  }

  return (
    <div className="rounded-lg overflow-hidden border mb-8">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full aspect-video object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          poster="/placeholder.svg?height=500&width=900"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-of-gaborone-in-botswana-9347-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

        {/* Video controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={enterFullscreen}
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-12 left-0 p-6 text-white">
          <Badge className="mb-2 bg-[#FAD440] text-black">VIDEO</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Aerial Tour: Gaborone's Rapid Urban Development Transforms Skyline
          </h2>
          <p className="text-gray-200 mb-4 max-w-2xl">
            Exclusive drone footage reveals the dramatic changes to Botswana's capital city as new construction projects
            reshape the urban landscape.
          </p>
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg?height=40&width=40" alt="Author" className="rounded-full w-10 h-10" />
            <div>
              <p className="font-medium">Tumelo Ramaphane</p>
              <p className="text-sm text-gray-300">Video Journalist • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">2:45 min</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">15.2K views</span>
        </div>
        <Link href="/article/video-gaborone-development" className="flex items-center text-[#FAD440] hover:underline">
          Watch full report <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}
