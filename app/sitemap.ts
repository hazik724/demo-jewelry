import { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jhumkara.com"

  /* ---------------- PRODUCTS ---------------- */
  const products = await client.fetch(`
    *[_type == "product"]{
      "slug": slug.current,
      _updatedAt
    }
  `)

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }))

  /* ---------------- CATEGORIES ---------------- */
  const categories = await client.fetch(`
    *[_type == "category"]{
      "slug": slug.current,
      _updatedAt
    }
  `)

  const categoryUrls = categories.map((cat: any) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  /* ---------------- STATIC PAGES ---------------- */
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    /* ---------------- DYNAMIC ---------------- */
    ...productUrls,
    ...categoryUrls,
  ]
}