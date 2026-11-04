import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import CartButton from "./CartButton"
import ProductGallery from "@/components/ProductGallery"
import FeaturedProducts from "@/components/featuredProducts"
import WhatsAppProductButton from "@/components/ProductWhatsapp"
import PremiumTrustSection from "@/components/TrustSection"
import CategoryLink from "@/components/CategoryLink"
import DeliveryText from "@/components/deliverytext"

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    images
  }`

  return await client.fetch(query, { slug })
}

const formatPKR = (n: number) => `PKR ${n.toLocaleString("en-PK")}`

/* ---------------- SEO METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Product Not Found | Jhumkara",
      description: "This product is not available.",
    }
  }

  const imageUrl =
    product.images?.length > 0
      ? urlFor(product.images[0]).width(1200).height(630).format("jpg").url()
      : "https://jhumkara.com/placeholder.png"

  const fallbackDescription = `${product.title} - Premium handcrafted jewelry by Jhumkara. Shop elegant jewelry online in Pakistan.`

  return {
    title: `${product.title} | Buy Jewelry Online Pakistan`,
    description: fallbackDescription,

    alternates: {
      canonical: `https://jhumkara.com/product/${product.slug.current}`,
    },

    openGraph: {
      title: product.title,
      description: product.description || fallbackDescription,
      url: `https://jhumkara.com/product/${product.slug.current}`,
      siteName: "Jhumkara",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || fallbackDescription,
      images: [imageUrl],
    },
  }
}

/* ---------------- PAGE ---------------- */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // KEEP AS YOU REQUESTED

  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const cartImage =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(600).url()
      : "/placeholder.png"

  /* ---------------- SALE LOGIC ---------------- */
  // price          = what the customer actually pays (cart, WhatsApp, schema)
  // compareAtPrice = showcase "was" price (display only)
  const onSale =
    typeof product.compareAtPrice === "number" &&
    typeof product.price === "number" &&
    product.compareAtPrice > product.price

  const savings = onSale ? product.compareAtPrice - product.price : 0
  const discountPercent = onSale
    ? Math.round((savings / product.compareAtPrice) * 100)
    : 0

  /* ---------------- JSON-LD SCHEMA ---------------- */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    image: product.images?.map((img: any) => urlFor(img).width(800).url()),

    description: product.description,

    sku: product._id,

    brand: {
      "@type": "Brand",
      name: "Jhumkara by Zyra",
    },

    offers: {
      "@type": "Offer",
      url: `https://jhumkara.com/product/${product.slug.current}`,
      priceCurrency: "PKR",
      price: product.price, // always the real price
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2027-12-31",
    },

    // aggregateRating intentionally removed: add it back only when real,
    // visible customer reviews exist on the page.
  }

  return (
    <div className="bg-white text-black">
      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 py-4 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-24 items-start">
          {/* LEFT - GALLERY */}
          <div className="relative md:sticky md:top-24">
            {/* SALE BADGE */}
            {onSale && (
              <div
                className="pointer-events-none absolute left-0 top-3 z-10 flex items-center gap-2 bg-[#9B1C31] py-1.5 pl-3 pr-5 text-white shadow-lg md:top-4 md:py-2 md:pl-4 md:pr-6 [clip-path:polygon(0_0,100%_0,calc(100%-12px)_50%,100%_100%,0_100%)]"
                aria-label={`${discountPercent}% off`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] md:text-xs">
                  Sale
                </span>
                <span className="h-4 w-px bg-white/40" />
                <span className="text-sm font-semibold leading-none md:text-base">
                  {discountPercent}% off
                </span>
              </div>
            )}

            <ProductGallery images={product.images} />
          </div>

          {/* RIGHT - CONVERSION ZONE */}
          <div className="flex flex-col space-y-8 md:space-y-10">
            {/* PRODUCT TITLE */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-light tracking-wide leading-tight">
                {product.title}
              </h1>

              {/* TRUST MICRO LINE */}
              <p className="text-sm text-neutral-500">
                Handcrafted jewelry by Jhumkara • Crafted with care in Pakistan
              </p>
            </div>

            {/* TRUST BADGES */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-3 py-1 border rounded-full text-neutral-600">
                ✓ Secure Checkout
              </span>
              <span className="px-3 py-1 border rounded-full text-neutral-600">
                ✓ Cash on Delivery
              </span>
              <span className="px-3 py-1 border rounded-full text-neutral-600">
                ✓ Fast Delivery
              </span>
            </div>

            {/* PRICE + CART */}
            <div className="pt-2 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p
                    className={
                      onSale
                        ? "text-3xl font-medium tracking-wide text-[#9B1C31]"
                        : "text-2xl tracking-widest"
                    }
                  >
                    {formatPKR(product.price)}
                  </p>

                  {onSale && (
                    <p className="text-lg text-neutral-400 line-through decoration-neutral-400">
                      {formatPKR(product.compareAtPrice)}
                    </p>
                  )}
                </div>

                {onSale && (
                  <p className="inline-block rounded-full bg-[#2FA084]/10 px-3 py-1 text-sm font-medium text-[#1f7a63]">
                    You save {formatPKR(savings)}
                  </p>
                )}
              </div>

              <CartButton
                id={product._id}
                title={product.title}
                slug={product.slug.current}
                price={product.price}
                image={cartImage}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-neutral-400">
                Description
              </h3>

              <p className="text-neutral-600 leading-loose max-w-md text-sm">
                {product.description}
              </p>
            </div>

            {/* WHATSAPP CTA (actual price only) */}
            <div className="mt-1">
              <WhatsAppProductButton
                productName={product.title}
                price={product.price}
                productUrl={`https://jhumkara.com/product/${product.slug.current}`}
              />
            </div>

            {/* DELIVERY INFO */}
            <div className="border-t border-neutral-200 pt-6 text-sm text-neutral-500 space-y-2">
              <DeliveryText />
            </div>

            {/* NAVIGATION CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/product"
                className="
                  flex-1 text-center
                  border border-black
                  px-6 py-3
                  text-xs uppercase tracking-widest
                  hover:bg-black hover:text-white
                  transition
                "
              >
                All Products
              </a>

              <a
                href="/category"
                className="
                  flex-1 text-center
                  border border-neutral-300
                  px-6 py-3
                  text-xs uppercase tracking-widest
                  hover:bg-[#2FA084] hover:text-white hover:border-[#2FA084]
                  transition
                "
              >
                Categories
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="space-y-16">
        <FeaturedProducts />
        <CategoryLink />
        <PremiumTrustSection />
      </div>
    </div>
  )
}