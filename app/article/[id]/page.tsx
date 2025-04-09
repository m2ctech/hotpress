import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTopHeadlines } from "@/lib/news-service"
import { ArticleView } from "@/components/article-view"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const articleId = decodeURIComponent(params.id)
    const response = await getTopHeadlines({ max: 100 })
    const article = response.articles.find((article) => encodeURIComponent(article.url) === params.id)

    if (!article) {
      return {
        title: "Article Not Found",
        description: "The requested article could not be found.",
      }
    }

    return {
      title: article.title,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: [{ url: article.image }],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Article",
      description: "Read the latest news article",
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    const articleId = decodeURIComponent(params.id)
    const response = await getTopHeadlines({ max: 100 })
    const article = response.articles.find((article) => encodeURIComponent(article.url) === params.id)

    if (!article) {
      notFound()
    }

    return <ArticleView article={article} />
  } catch (error) {
    console.error("Error fetching article:", error)
    notFound()
  }
}
