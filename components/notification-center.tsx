"use client"

import { useState } from "react"
import { Bell, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications } from "@/contexts/notification-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function NotificationCenter() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [selectedTab, setSelectedTab] = useState("all")

  const unreadNotifications = notifications.filter((notification) => !notification.read)
  const readNotifications = notifications.filter((notification) => notification.read)

  const displayedNotifications =
    selectedTab === "all" ? notifications : selectedTab === "unread" ? unreadNotifications : readNotifications

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Stay updated with the latest news and activities</CardDescription>
          </div>
          {unreadNotifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All
              <Badge className="ml-2 bg-muted text-muted-foreground">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge className="ml-2 bg-[#FAD440] text-black">{unreadNotifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="read">
              Read
              <Badge className="ml-2 bg-muted text-muted-foreground">{readNotifications.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            {displayedNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No {selectedTab === "all" ? "" : selectedTab} notifications
              </div>
            ) : (
              <div className="space-y-4">
                {displayedNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${notification.read ? "" : "bg-muted/30 border-[#FAD440]"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.read && <Badge className="bg-[#FAD440] text-black">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(notification.date)}</p>
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    {notification.link && (
                      <div className="mt-2">
                        <Button variant="link" className="p-0 h-auto" asChild>
                          <Link href={notification.link}>View details</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
