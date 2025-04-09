import { type NextRequest, NextResponse } from "next/server"
import type { NewsApiResponse, NewsApiOptions } from "@/types/newsapi"

const API_KEY = "1061c85eeabe4a9686da7986f334dff7"
const BASE_URL = "https://newsapi.org/v2"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const options: NewsApiOptions = {
      category: searchParams.get("category") || undefined,
      query: searchParams.get("query") || undefined,
      lang: searchParams.get("lang") || "en",
      country: searchParams.get("country") || "us",
      pageSize: Number(searchParams.get("max")) || 10,
      page: Number(searchParams.get("page")) || 1,
    }

    const data = await fetchNews(options)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

async function fetchNews(options: NewsApiOptions): Promise<NewsApiResponse> {
  let endpoint = ""
  const queryParams = new URLSearchParams()

  // Add API key
  queryParams.append("apiKey", API_KEY || "")

  // Add other parameters
  if (options.lang) queryParams.append("language", options.lang)
  if (options.country) queryParams.append("country", options.country)
  if (options.pageSize) queryParams.append("pageSize", options.pageSize.toString())
  if (options.page) queryParams.append("page", options.page.toString())

  // Determine endpoint based on options
  if (options.query) {
    endpoint = `${BASE_URL}/everything?${queryParams.toString()}&q=${encodeURIComponent(options.query)}`
  } else if (options.category) {
    endpoint = `${BASE_URL}/top-headlines?${queryParams.toString()}&category=${options.category}`
  } else {
    endpoint = `${BASE_URL}/top-headlines?${queryParams.toString()}`
  }

  const response = await fetch(endpoint)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`News API error: ${response.status} ${errorText}`)
  }

  return await response.json()
}
