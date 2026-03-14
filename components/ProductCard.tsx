"use client"

import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import CartButton from "@/app/(app)/product/[slug]/CartButton"

interface Variant {
  size?: string
  color?: string
  variantStock?: number
}

interface Product {
  _id: string
  title: string
  slug: { current: string }
  images: any[]
  price: number
  discountPrice?: number
  variants?: Variant[]
}

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug.current}`}
      className="group block"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden">
        <Image
          src={
            product.images?.[0]
              ? urlFor(product.images[0]).width(800).height(1000).url()
              : "/placeholder.png"
          }
          alt={product.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </div>

      {/* TEXT */}
      <div className="pt-4 space-y-1">

        <h2 className="text-sm md:text-base font-normal tracking-wide text-neutral-900">
          {product.title}
        </h2>

        <div className="flex items-center gap-2 text-sm">

          <span className="text-black font-medium">
            PKR {product.discountPrice ?? product.price}
          </span>

          {product.discountPrice && (
            <span className="line-through text-neutral-400">
              ${product.price}
            </span>
            
          )}
        

        </div>

      </div>
           
    </Link>
    
  )
}