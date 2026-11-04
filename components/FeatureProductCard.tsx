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
  price: number // actual price the customer pays
  compareAtPrice?: number // showcase "was" price (display only)
}

interface Props {
  product: Product
}

const formatPKR = (n: number) => `PKR ${n.toLocaleString("en-PK")}`

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

  /* ---------------- SALE LOGIC ---------------- */
  const onSale =
    typeof product.compareAtPrice === "number" &&
    typeof product.price === "number" &&
    product.compareAtPrice > product.price

  const discountPercent = onSale
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) *
          100
      )
    : 0

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
          <div
            className="
            absolute inset-0
            bg-gradient-to-t from-black/10 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition
          "
          />

          {/* SALE BADGE */}
          {onSale && (
            <div
              className="pointer-events-none absolute left-0 top-2 z-10 flex items-center gap-1.5 bg-[#9B1C31] py-1 pl-2 pr-4 text-white shadow-md md:top-3 md:gap-2 md:py-1.5 md:pl-3 md:pr-5 [clip-path:polygon(0_0,100%_0,calc(100%-9px)_50%,100%_100%,0_100%)]"
              aria-label={`${discountPercent}% off`}
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] md:text-[10px]">
                Sale
              </span>
              <span className="h-3 w-px bg-white/40" />
              <span className="text-[11px] font-semibold leading-none md:text-xs">
                {discountPercent}% off
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <Link href={`/product/${product.slug.current}`}>
          <h3
            className="
            text-sm md:text-base font-medium
            line-clamp-2 min-h-[40px]
            hover:underline
          "
          >
            {product.title}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span
            className={`font-semibold text-sm md:text-base ${
              onSale ? "text-[#9B1C31]" : "text-black"
            }`}
          >
            {formatPKR(product.price)}
          </span>

          {onSale && (
            <span className="line-through text-gray-400 text-xs">
              {formatPKR(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {/* CART (actual price only, optimized image) */}
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