import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import ProductsClient from "./ProductsClient"

// Re-generate this page at most once every 60 seconds (fast + always fresh enough)
export const revalidate = 60

const SITE_URL = "https://jhumkara.com"

/* ---------------- SSR DATA ---------------- */
async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc){
    _id,
    title,
    slug,
    images,
    price,
    compareAtPrice,
    categories[]->{ title, slug }
  }`

  return await client.fetch(query)
}

// Only categories that actually contain products (no empty pills)
async function getCategories() {
  const query = `*[_type == "category" && count(*[_type == "product" && references(^._id)]) > 0]
    | order(title asc){
    title,
    slug
  }`

  return await client.fetch(query)
}

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: "Jewelry Collection | Buy Jewelry Online in Pakistan | Jhumkara",
  description:
    "Explore premium handcrafted jewelry including earrings, rings, necklaces, and luxury accessories by Jhumkara by Zyra. Cash on delivery across Pakistan.",
  alternates: {
    canonical: `${SITE_URL}/product`,
  },
  openGraph: {
    title: "Jewelry Collection | Jhumkara by Zyra",
    description:
      "Premium handcrafted jewelry designed for modern elegance. Shop online in Pakistan.",
    url: `${SITE_URL}/product`,
    siteName: "Jhumkara",
    type: "website",
  },
}

/* ---------------- PAGE ---------------- */
export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  /* ---------------- JSON-LD (ItemList) ---------------- */
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Jewelry Collection by Jhumkara",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 24).map((p: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/product/${p.slug.current}`,
      name: p.title,
      ...(p.images?.[0]
        ? { image: urlFor(p.images[0]).width(600).url() }
        : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <ProductsClient initialProducts={products} categories={categories} />
    </>
  )
}