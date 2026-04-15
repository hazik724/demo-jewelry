"use client"

import { useEffect, useState } from "react"
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const query = `*[_type == "product"] | order(_createdAt desc)[0..11]{
        _id,
        title,
        slug,
        images,
        price,
        discountPrice
      }`
      const result = await client.fetch(query)
      setProducts(result)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const SkeletonCard = () => (
    <div className="bg-black/10 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse h-[400px]" />
  )

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-8 py-16"
      aria-labelledby="featured-products-heading"
    >

      {/* 🔥 SEO Hidden Content */}
      <div className="sr-only">
        <h2>Buy Latest Jewelry Online in Pakistan - Jhumkara by Zyra</h2>
        <p>
          Explore our newest collection of earrings, necklaces, rings, and
          premium accessories crafted for elegance and modern style.
        </p>
      </div>

      {/* Visible Heading */}
      <header>
        <h2
          id="featured-products-heading"
          className="text-3xl md:text-5xl font-light text-center mb-16 tracking-tight"
        >
          New Arrivals Jewelry Collection
        </h2>
      </header>

      {/* Product Grid as LIST (important for SEO) */}
      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        role="list"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <li key={i}>
                <SkeletonCard />
              </li>
            ))
          : products.map((product) => (
              <li key={product._id}>
                <FeaturedProductCard product={product} />
              </li>
            ))}
      </ul>

      {/* 🔥 Internal Linking Boost */}
      {!loading && products.length > 0 && (
        <div className="text-center mt-12">
          <a
            href="/product"
            className="inline-block border border-black px-10 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition"
            aria-label="View all jewelry products"
          >
            View All Products
          </a>
        </div>
      )}
    </section>
  )
}