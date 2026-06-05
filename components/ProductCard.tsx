import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { useMemo, memo } from "react"

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

  return (
    <article className="group block">

      <Link
        href={`/product/${product.slug.current}`}
        aria-label={`View ${product.title} details`}
        className="block"
      >

        {/* IMAGE WRAPPER */}
        <div className="
          relative w-full aspect-[4/5]
          bg-neutral-100
          overflow-hidden
        ">

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
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/10 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition
          " />

        </div>

        {/* TEXT */}
        <div className="pt-4 space-y-1">

          <h3 className="
            text-sm md:text-base
            font-normal
            tracking-wide
            text-neutral-900
            line-clamp-2
          ">
            {product.title}
          </h3>

          <div className="flex items-center gap-2 text-sm">

            <span className="text-black font-medium">
              PKR {product.discountPrice ?? product.price}
            </span>

            {product.discountPrice && (
              <span className="line-through text-neutral-400">
                PKR {product.price}
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