import { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseUrl = "https://jhumkara.com"

  // 🔥 Fetch all products from Sanity
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

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
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

    // 🔥 dynamic product pages
    ...productUrls,
  ]
}