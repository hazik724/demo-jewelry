"use client"

import Image from "next/image"
import Link from "next/link"
import CartButton from "@/app/(app)/product/[slug]/CartButton"
import { useCartStore } from "@/app/store/CartStore"
import { urlFor } from "@/sanity/lib/image"
import { useEffect, useState, useMemo } from "react"

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

export default function FeaturedProductCard({ product }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = product.images?.length
    ? product.images
    : ["/placeholder.png"]

  const imageUrls = useMemo(() => {
    return images.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(500).height(600).url()
    )
  }, [images])

  useEffect(() => {
    if (imageUrls.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === imageUrls.length - 1 ? 0 : prev + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [imageUrls.length])

  // 🔥 SEO: Product Schema (VERY IMPORTANT)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: imageUrls,
    description: `${product.title} - Premium jewelry by Jhumkara`,
    brand: {
      "@type": "Brand",
      name: "Jhumkara by Zyra",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.discountPrice ?? product.price,
      availability: "https://schema.org/InStock",
      url: `https://jhumkara.com/product/${product.slug.current}`,
    },
  }

  return (
    <div
      className="group relative bg-white dark:bg-gray-900 overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
      itemScope
      itemType="https://schema.org/Product"
    >

      {/* 🔥 JSON-LD (Google reads this) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* IMAGE */}
      <Link
        href={`/product/${product.slug.current}`}
        aria-label={`View details of ${product.title}`}
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden">

          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {imageUrls.map((imageUrl, i) => (
              <div key={i} className="relative w-full h-full flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={`${product.title} - buy jewelry online Pakistan`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        </div>
      </Link>

      {/* INFO */}
      <div className="p-4 space-y-2">

        <Link
          href={`/product/${product.slug.current}`}
          className="block"
        >
          <h3
            className="text-sm md:text-base font-medium line-clamp-2 hover:underline min-h-[40px]"
            itemProp="name"
          >
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span
            className="text-[#740A03] font-semibold text-sm md:text-base"
            itemProp="price"
          >
            PKR {product.discountPrice ?? product.price}
          </span>

          {product.discountPrice && (
            <span className="line-through text-gray-400 text-xs">
              {product.price}
            </span>
          )}
        </div>

        <div className="pt-6">
          <CartButton
            id={product._id}
            title={product.title}
            slug={product.slug.current}
            price={product.price}
            image={
              product.images?.[0]
                ? urlFor(product.images[0]).width(600).url()
                : "/placeholder.png"
            }
          />
        </div>
      </div>
    </div>
  )
}