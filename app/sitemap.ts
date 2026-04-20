import { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // 🔥 Fetch all products from Sanity
  const products = await client.fetch(`
    *[_type == "product"]{
      "slug": slug.current,
      _updatedAt
    }
  `)

  const productUrls = products.map((product: any) => ({
    url: `https://jhumkara.com/product/${product.slug}`,
    lastModified: new Date(product._updatedAt),
  }))

  return [
    {
      url: "https://jhumkara.com",
      lastModified: new Date(),
    },
    {
      url: "https://jhumkara.com/products",
      lastModified: new Date(),
    },

    // 🔥 dynamic product pages
    ...productUrls,
  ]
}