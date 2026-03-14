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

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-black/10 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse h-[400px] flex flex-col justify-between">
      <div className="bg-black/20 dark:bg-gray-700 h-64 w-full mb-4" />
      <div className="px-4 pb-4 space-y-2">
        <div className="h-6 bg-black/20 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-black/20 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-10 bg-black/20 dark:bg-gray-700 rounded w-full mt-4" />
      </div>
    </div>
  )

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h2 className="text-3xl md:text-5xl font-light tracking-wide leading-tight text-center mb-16 tracking-tight">
        New Arrivals
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <FeaturedProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  )
}