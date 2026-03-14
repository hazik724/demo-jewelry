"use client"

import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

interface Product {
  _id: string
  title: string
  slug: { current: string }
  images: any[]
  price: number
  discountPrice?: number
}

interface Props {
  product: Product
}

export default function CategoryProductCard({ product }: Props) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(500).height(600).url()
    : "/placeholder.png"

  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  return (
    <Link
      href={`/product/${product.slug.current}`}
      className="group relative block bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay for luxury effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Discount Badge */}
        {discountPercentage && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm md:text-base font-semibold line-clamp-2 min-h-[44px]">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold text-sm md:text-base">
            ${product.discountPrice ?? product.price}
          </span>
          {product.discountPrice && (
            <span className="line-through text-gray-400 text-xs md:text-sm">
              PKR {product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}