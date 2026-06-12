import Image from "next/image"
import Link from "next/link"
import CartButton from "@/app/(app)/product/[slug]/CartButton"
import { urlFor } from "@/sanity/lib/image"
import { memo, useMemo } from "react"

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

function FeaturedProductCard({ product }: Props) {
  /**
   * Normalize images ONCE per product
   * No runtime recalculation per render
   */
  const { primaryImage, secondaryImage } = useMemo(() => {
    const imgs = product.images?.length
      ? product.images
      : ["/placeholder.png"]

    const toUrl = (img: any) =>
      typeof img === "string"
        ? img
        : urlFor(img)
            .width(340)
            .height(420)
            .quality(70)
            .auto("format")
            .url()

    return {
      primaryImage: toUrl(imgs[0]),
      secondaryImage: imgs[1] ? toUrl(imgs[1]) : null,
    }
  }, [product.images])

  return (
    <div
      className="
        group relative
        bg-white dark:bg-gray-900
        overflow-hidden
        border border-gray-100
        hover:shadow-2xl
        transition-shadow duration-300
        will-change-transform
        transform-gpu
      "
    >

      {/* IMAGE WRAPPER */}
      <Link
        href={`/product/${product.slug.current}`}
        aria-label={`View ${product.title}`}
        className="block"
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">

          {/* PRIMARY IMAGE (LCP SAFE) */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
            quality={75}
            className="
              object-cover
              transition-transform duration-700
              group-hover:scale-105
              will-change-transform
            "
          />

          {/* SECONDARY IMAGE (HOVER ONLY, NO JS) */}
          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              loading="lazy"
              quality={75}
              className="
                object-cover
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-500
                will-change-opacity
              "
            />
          )}

          {/* PREMIUM LIGHT OVERLAY */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/10 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition
          " />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        <Link href={`/product/${product.slug.current}`}>
          <h3 className="
            text-sm md:text-base font-medium
            line-clamp-2 min-h-[40px]
            hover:underline
          ">
            {product.title}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-[#740A03] font-semibold text-sm md:text-base">
            PKR {product.discountPrice ?? product.price}
          </span>

          {product.discountPrice && (
            <span className="line-through text-gray-400 text-xs">
              PKR {product.price}
            </span>
          )}
        </div>

        {/* CART (optimized image only) */}
        <div className="pt-6">
          <CartButton
            id={product._id}
            title={product.title}
            slug={product.slug.current}
            price={product.price}
            image={primaryImage}
          />
        </div>

      </div>
    </div>
  )
}

export default memo(FeaturedProductCard)