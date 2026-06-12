import { client } from "@/sanity/lib/client"
import LuxuryCategoryUI from "@/components/LuxuryCategoryUI"
import type { Metadata } from "next"

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: "Shop Jewelry Categories | Jhumkara by Zyra",
  description:
    "Explore jewelry categories including rings, earrings, necklaces, and luxury handcrafted collections by Jhumkara by Zyra.",

  alternates: {
    canonical: "https://jhumkara.com/category",
  },

  openGraph: {
    title: "Jewelry Categories | Jhumkara",
    description:
      "Browse premium jewelry categories and handcrafted collections in Pakistan.",
    url: "https://jhumkara.com/category",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jewelry Categories",
    description: "Explore premium jewelry categories online.",
  },
}

export default async function CategoryPage() {
  const query = `*[_type == "category"]{
    title,
    slug,
    image
  }`

  const categories = await client.fetch(query)

  const categorySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: categories.map((cat: any, index: number) => ({
    "@type": "ListItem",
    position: index + 1,
    name: cat.title,
    url: `https://jhumkara.com/category/${cat.slug.current}`,
  })),
}

  return (
    
    <main>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
/>
      {/* 🔥 SEO TEXT (helps Google understand context) */}
      <div className="sr-only">
        <h1>Jewelry Categories</h1>
        <p>
          Explore premium handcrafted jewelry categories including rings,
          earrings, necklaces, and luxury accessories by Jhumkara by Zyra.
        </p>
      </div>

      <LuxuryCategoryUI categories={categories} />
    </main>
  )
}