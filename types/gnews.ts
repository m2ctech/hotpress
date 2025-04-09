export interface GNewsArticle {
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

export interface GNewsResponse {
  totalArticles: number
  articles: GNewsArticle[]
}

export interface NewsApiOptions {
  category?: string
  query?: string
  lang?: string
  country?: string
  max?: number
  page?: number
}
