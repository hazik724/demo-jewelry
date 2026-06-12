import Link from "next/link"
import { client } from "@/sanity/lib/client"
import FeaturedProductCard from "@/components/FeatureProductCard"

interface Product {
  _id: string
  title: string
  slug: { current: string }
  images: any[]
  price: number
  discountPrice?: number
}

const query = `*[_type == "product"] | order(_createdAt desc)[0..11]{
  _id,
  title,
  slug,
  images,
  price,
  discountPrice
}`

export default async function FeaturedProducts() {
  const products: Product[] = await client.fetch(
    query,
    {},
    {
      next: {
        revalidate: 300,
      },
    }
  )

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-16"
      aria-labelledby="featured-products-heading"
    >
      <div className="sr-only">
        <h2>Buy Latest Jewelry Online in Pakistan - Jhumkara by Zyra</h2>
        <p>
          Explore our newest collection of earrings, necklaces, rings,
          and premium accessories crafted for elegance and modern style.
        </p>
      </div>

      <header>
        <h2
          id="featured-products-heading"
          className="text-3xl md:text-5xl font-light text-center mb-16 tracking-tight"
        >
          New Arrivals Jewelry Collection
        </h2>
      </header>

      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        role="list"
      >
        {products.map((product) => (
          <li key={product._id}>
            <FeaturedProductCard product={product} />
          </li>
        ))}
      </ul>

      <div className="text-center mt-12">
        <Link
          href="/product"
          className="inline-block border border-black px-10 py-3 text-sm uppercase tracking-widest hover:bg-[#2FA084] hover:text-white transition"
        >
          View All Products
        </Link>
      </div>
    </section>
  )
}