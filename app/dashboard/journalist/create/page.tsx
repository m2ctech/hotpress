"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Save, ImageIcon, Calendar, Clock, Send, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { createArticle, getArticleById, updateArticle, uploadFile } from "@/lib/appwrite"

export default function CreateArticlePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const articleId = searchParams.get("id")
  const { user } = useAuth()
  const { addToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [articleData, setArticleData] = useState({
    title: "",
    subtitle: "",
    category: "",
    content: "",
    featuredImage: null as File | null,
    featuredImageUrl: "",
    tags: "",
    publishDate: "",
    publishTime: "",
    status: "draft",
    authorId: "",
    authorName: "",
  })

  useEffect(() => {
    // Set author information
    if (user) {
      setArticleData((prev) => ({
        ...prev,
        authorId: user.$id,
        authorName: user.name,
      }))
    }

    // Load article data if editing an existing article
    if (articleId) {
      setIsLoading(true)
      getArticleById(articleId)
        .then((article) => {
          setArticleData({
            ...article,
            tags: article.tags.join(", "),
            publishDate: article.publishDate || "",
            publishTime: article.publishTime || "",
            featuredImage: null,
            featuredImageUrl: article.featuredImageUrl || "",
          })
        })
        .catch((error) => {
          console.error("Error loading article:", error)
          addToast("Failed to load article", "error")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [user, articleId, addToast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setArticleData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setArticleData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setArticleData((prev) => ({ ...prev, featuredImage: file }))

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setArticleData((prev) => ({
          ...prev,
          featuredImageUrl: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!articleData.title || !articleData.content || !articleData.category) {
        addToast("Please fill in all required fields", "error")
        setIsSubmitting(false)
        return
      }

      // Upload image if provided
      let imageUrl = articleData.featuredImageUrl
      if (articleData.featuredImage) {
        const { fileUrl } = await uploadFile(articleData.featuredImage)
        imageUrl = fileUrl
      }

      // Prepare article data
      const articleToSave = {
        title: articleData.title,
        subtitle: articleData.subtitle,
        category: articleData.category,
        content: articleData.content,
        featuredImageUrl: imageUrl,
        tags: articleData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        publishDate: articleData.publishDate,
        publishTime: articleData.publishTime,
        status: isDraft ? "draft" : "published",
        authorId: articleData.authorId,
        authorName: articleData.authorName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Create or update article
      if (articleId) {
        await updateArticle(articleId, articleToSave)
        addToast(isDraft ? "Draft updated successfully" : "Article updated and published", "success")
      } else {
        await createArticle(articleToSave)
        addToast(isDraft ? "Article saved as draft" : "Article published successfully", "success")
      }

      // Redirect to journalist dashboard
      router.push("/dashboard/journalist")
    } catch (error) {
      console.error("Error saving article:", error)
      addToast("Failed to save article", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8 text-center">
        <p>Loading article...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/journalist">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{articleId ? "Edit Article" : "Create New Article"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            className="bg-[#FAD440] text-black hover:bg-[#FAD440]/80"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a compelling title"
                    value={articleData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle / Excerpt</Label>
                  <Input
                    id="subtitle"
                    name="subtitle"
                    placeholder="Brief summary of the article"
                    value={articleData.subtitle}
                    onChange={handleChange}
                  />
                </div>

                <Tabs defaultValue="write">
                  <TabsList>
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Article Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Write your article here..."
                        className="min-h-[400px]"
                        value={articleData.content}
                        onChange={handleChange}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="preview" className="mt-4">
                    <div className="border rounded-md p-4 min-h-[400px]">
                      <div className="prose max-w-none">
                        <h1>{articleData.title || "Article Title"}</h1>
                        <p className="lead">{articleData.subtitle || "Article subtitle will appear here"}</p>
                        <div>
                          {articleData.content ? (
                            <div dangerouslySetInnerHTML={{ __html: articleData.content.replace(/\n/g, "<br />") }} />
                          ) : (
                            <p className="text-muted-foreground">Article content will appear here...</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={articleData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  {articleData.featuredImageUrl ? (
                    <div className="mb-4">
                      <img
                        src={articleData.featuredImageUrl || "/placeholder.svg"}
                        alt="Featured"
                        className="mx-auto max-h-40 object-contain"
                      />
                    </div>
                  ) : (
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop an image, or{" "}
                    <label htmlFor="featuredImage" className="text-[#FAD440] cursor-pointer">
                      browse
                    </label>
                  </p>
                  <Input
                    id="featuredImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Separate tags with commas"
                  value={articleData.tags}
                  onChange={handleChange}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Publishing Schedule</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="publishDate"
                      name="publishDate"
                      type="date"
                      className="pl-10"
                      value={articleData.publishDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="publishTime"
                      name="publishTime"
                      type="time"
                      className="pl-10"
                      value={articleData.publishTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>SEO Settings</Label>
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle" className="text-sm">
                      Meta Title
                    </Label>
                    <Input id="metaTitle" placeholder="SEO title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription" className="text-sm">
                      Meta Description
                    </Label>
                    <Textarea id="metaDescription" placeholder="SEO description" className="h-20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
