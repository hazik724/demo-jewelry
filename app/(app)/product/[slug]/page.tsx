import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import CartButton from "./CartButton"
import ProductGallery from "@/components/ProductGallery"
import FeaturedProducts from "@/components/featuredProducts"
import WhatsAppProductButton from "@/components/ProductWhatsapp"

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    price,
    images
  }`

  return await client.fetch(query, { slug })
}

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
      ? urlFor(product.images[0]).width(1200).url()
      : "/placeholder.png"

  return {
    title: `${product.title} | Buy Jewelry Online Pakistan`,
    description: `${product.title} - Premium handcrafted jewelry by Jhumkara. Shop elegant jewelry online in Pakistan.`,

    alternates: {
      canonical: `https://jhumkara.com/product/${product.slug.current}`,
    },

    openGraph: {
      title: product.title,
      description: product.description,
      url: `https://jhumkara.com/product/${product.slug.current}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: "website",
    },
  }
}

/* ---------------- PAGE ---------------- */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ❗ KEEP AS YOU REQUESTED

  const product = await getProduct(slug)

  if (!product) {
    return <div className="p-10">Product not found</div>
  }

  const imageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(500).url()
      : "/placeholder.png"

  /* ---------------- JSON-LD SCHEMA ---------------- */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images?.map((img: any) =>
      urlFor(img).width(800).url()
    ),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Jhumkara by Zyra",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `https://jhumkara.com/product/${product.slug.current}`,
    },
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

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-start">

          {/* LEFT */}
          <div className="w-full max-w-full">
            <ProductGallery images={product.images} />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-start space-y-12">

            {/* Title */}
            <div>
              <h1 className="text-5xl font-light tracking-wide leading-tight">
                {product.title} – Premium Jewelry
              </h1>
            </div>

            {/* Price */}
            <div>
              <p className="text-2xl tracking-widest">
                PKR {product.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-neutral-600 leading-loose max-w-md">
                {product.description}
              </p>
            </div>

            {/* WhatsApp */}
            <WhatsAppProductButton
              productName={product.title}
              price={product.price}
              productUrl={`https://jhumkara.com/product/${product.slug.current}`}
            />

            {/* Cart */}
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

            {/* Trust Block */}
            <div className="border-t border-neutral-200 pt-8 text-sm text-neutral-500 space-y-2">
              <p>Made with premium materials</p>
              <p>Complimentary worldwide shipping</p>
              <p>30-day returns</p>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      <FeaturedProducts />
    </div>
  )
}