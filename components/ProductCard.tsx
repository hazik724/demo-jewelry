import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { useMemo, memo } from "react"

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

function ProductCard({ product }: Props) {
  /**
   * Convert images ONCE only (no runtime cost per render cycle)
   */
  const { primaryImage, secondaryImage } = useMemo(() => {
    const imgs = product.images?.length
      ? product.images
      : ["/placeholder.png"]

    const toUrl = (img: any) =>
      typeof img === "string"
        ? img
        : urlFor(img)
            .width(380)
            .height(480)
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
    <article className="group block">
      <Link
        href={`/product/${product.slug.current}`}
        aria-label={`View ${product.title} details`}
        className="block"
      >
        {/* IMAGE WRAPPER */}
        <div
          className="
          relative w-full aspect-[4/5]
          bg-neutral-100
          overflow-hidden
        "
        >
          {/* PRIMARY IMAGE */}
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

          {/* SECOND IMAGE (HOVER ONLY, NO JS) */}
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
              "
            />
          )}

          {/* LIGHT PREMIUM OVERLAY */}
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

        {/* TEXT */}
        <div className="pt-4 space-y-1">
          <h3
            className="
            text-sm md:text-base
            font-normal
            tracking-wide
            text-neutral-900
            line-clamp-2
          "
          >
            {product.title}
          </h3>

          <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
            <span
              className={
                onSale ? "font-medium text-[#9B1C31]" : "font-medium text-black"
              }
            >
              {formatPKR(product.price)}
            </span>

            {onSale && (
              <span className="text-neutral-400 line-through">
                {formatPKR(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

/**
 * Prevent unnecessary rerenders in large grids
 */
export default memo(ProductCard)