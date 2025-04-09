import type { NewsApiResponse, NewsApiOptions } from "@/types/newsapi"

export async function getTopHeadlines(options?: Partial<NewsApiOptions>): Promise<NewsApiResponse> {
  const queryParams = new URLSearchParams()

  if (options?.category) queryParams.append("category", options.category)
  if (options?.lang) queryParams.append("language", options.lang)
  if (options?.country) queryParams.append("country", options.country)
  if (options?.pageSize) queryParams.append("pageSize", options.pageSize.toString())
  if (options?.page) queryParams.append("page", options.page.toString())

  const response = await fetch(`/api/news?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch headlines")
  }

  return await response.json()
}

export async function searchNews(query: string, options?: Partial<NewsApiOptions>): Promise<NewsApiResponse> {
  const queryParams = new URLSearchParams()

  queryParams.append("q", query)
  if (options?.lang) queryParams.append("language", options.lang)
  if (options?.country) queryParams.append("country", options.country)
  if (options?.pageSize) queryParams.append("pageSize", options.pageSize.toString())
  if (options?.page) queryParams.append("page", options.page.toString())

  const response = await fetch(`/api/news?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to search news")
  }

  return await response.json()
}

export async function getNewsByCategory(category: string, options?: Partial<NewsApiOptions>): Promise<NewsApiResponse> {
  const queryParams = new URLSearchParams()

  queryParams.append("category", category)
  if (options?.lang) queryParams.append("language", options.lang)
  if (options?.country) queryParams.append("country", options.country)
  if (options?.pageSize) queryParams.append("pageSize", options.pageSize.toString())
  if (options?.page) queryParams.append("page", options.page.toString())

  const response = await fetch(`/api/news?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch news for category: ${category}`)
  }

  return await response.json()
}

// Helper function to format News API article to match our UI components
export function formatArticle(article: NewsApiResponse['articles'][0]) {
  return {
    id: encodeURIComponent(article.url),
    title: article.title,
    excerpt: article.description,
    content: article.content,
    image: article.urlToImage,
    category: "News", // Default category
    date: new Date(article.publishedAt).toLocaleString(),
    source: article.source.name,
    sourceUrl: article.source.url,
    url: article.url,
    publishedAt: article.publishedAt,
  }
}
