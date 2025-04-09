"use client"

import Link from "next/link"
import { User, Settings, LogOut, Ticket, CreditCard, BookOpen, Bell, Bookmark, History, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useNotifications } from "@/contexts/notification-context"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function UserAccountNav() {
  const { user, logout, toggleRole } = useAuth()
  const { notifications, unreadCount, markAsRead } = useNotifications()

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="outline" size="sm" className="bg-white text-black hover:bg-white/80">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/register" className="hidden md:block">
          <Button size="sm" className="bg-black text-white hover:bg-black/80">
            Sign Up
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-black">
              <Download className="h-5 w-5" />
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
    )
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">
      {/* Notifications dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#FAD440] text-black text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Mark all as read
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-auto">
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">No notifications</div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0">
                  <div
                    className={`w-full p-3 cursor-pointer ${notification.read ? "" : "bg-muted/50"}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/user/notifications" className="w-full text-center cursor-pointer">
              View all notifications
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* App download button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Download className="h-5 w-5" />
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

      {/* User dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user">
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/profile">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/bookmarks">
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Bookmarks</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/history">
                <History className="mr-2 h-4 w-4" />
                <span>Reading History</span>
              </Link>
            </DropdownMenuItem>
            {user.role === "journalist" && (
              <DropdownMenuItem asChild>
                <Link href="/dashboard/journalist">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Journalist Portal</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/tickets">
                <Ticket className="mr-2 h-4 w-4" />
                <span>My Tickets</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/user/billing">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>{user.isPremium ? "Manage Subscription" : "Upgrade to Premium"}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          {/* For demo purposes - toggle between user and journalist roles */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <User className="mr-2 h-4 w-4" />
              <span>Switch Role (Demo)</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={toggleRole}>
                <span>{user.role === "user" ? "Switch to Journalist" : "Switch to User"}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

import { QrCode } from "lucide-react"
