import CategorySort from "@/components/categorySort"
import { client } from "@/sanity/lib/client"
import CategoryProductCard from "@/components/ProductCard"
import type { Metadata } from "next"

/* ---------------- SEO METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const formattedSlug = slug.replace("-", " ")

return {
  title: `${formattedSlug} Jewelry Collection in Pakistan | Jhumkara by Zyra`,
  description: `Shop premium ${formattedSlug} jewelry in Pakistan. Discover handcrafted earrings, rings, necklaces with elegant designs. Cash on delivery available.`,

  alternates: {
    canonical: `https://jhumkara.com/category/${slug}`,
  },

  openGraph: {
    title: `${formattedSlug} Jewelry Collection`,
    description: `Explore premium ${formattedSlug} jewelry at Jhumkara by Zyra.`,
    url: `https://jhumkara.com/category/${slug}`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${formattedSlug} Jewelry Collection`,
    description: `Shop ${formattedSlug} jewelry online in Pakistan.`,
  },
}
}

/* ---------------- PAGE ---------------- */
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}) {
  const { slug } = await params
  const { sort } = await searchParams

  let order = "_createdAt desc"
  if (sort === "price-low") order = "price asc"
  if (sort === "price-high") order = "price desc"

  const query = `*[_type == "product" && $slug in categories[]->slug.current] | order(${order}){
    _id,
    title,
    slug,
    images,
    price,
    discountPrice
  }`

  const products = await client.fetch(query, { slug })
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((product: any, index: number) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://jhumkara.com/product/${product.slug.current}`,
    name: product.title,
  })),
}
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(itemListSchema),
  }}
/>

      {/* 🔥 Hidden SEO Content */}
     <p className="text-gray-500 max-w-2xl">
  Explore our premium {slug} jewelry collection featuring handcrafted
  earrings, rings, and necklaces designed for elegance and everyday luxury.
</p>

      {/* Category Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">

        <h1 className="text-4xl font-light capitalize tracking-tight">
          {slug} Collection
        </h1>

        <CategorySort />
      </header>

      {/* Product Grid */}
      {products.length > 0 ? (
        <section aria-label={`${slug} jewelry products`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <CategoryProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-24">
          <h2 className="text-2xl font-semibold mb-4">
            No products found
          </h2>
          <p className="text-gray-500">
            This category doesn’t have any products yet.
          </p>
        </section>
      )}

    </main>
  )
}