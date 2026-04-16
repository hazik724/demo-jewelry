import ProductsClient from "./ProductsClient"
import type { Metadata } from "next"

/* ---------------- SEO METADATA (UPGRADED) ---------------- */
export const metadata: Metadata = {
  title: "Buy Jewelry Online in Pakistan | Jhumkara by Zyra",
  description:
    "Explore premium handcrafted jewelry in Pakistan including bridal jewelry, earrings, rings, necklaces, and luxury accessories. Shop online with cash on delivery and affordable prices.",

  alternates: {
    canonical: "https://jhumkara.com/products",
  },

  openGraph: {
    title: "Jewelry Collection | Jhumkara by Zyra",
    description:
      "Premium handcrafted jewelry collection in Pakistan. Explore earrings, rings, necklaces, and luxury fashion pieces.",
    url: "https://jhumkara.com/products",
    siteName: "Jhumkara by Zyra",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jewelry Collection Pakistan | Jhumkara",
    description:
      "Shop premium handcrafted jewelry online in Pakistan with cash on delivery.",
  },
}

/* ---------------- STRUCTURED DATA (SEO POWER BOOST) ---------------- */
const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Jewelry Collection Pakistan",
  description:
    "Premium handcrafted jewelry collection in Pakistan by Jhumkara by Zyra.",
  url: "https://jhumkara.com/products",
  mainEntity: {
    "@type": "ItemList",
    name: "Jewelry Products",
  },
}

/* ---------------- OPTIONAL FAQ SCHEMA (RICH RESULTS BOOST) ---------------- */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you offer cash on delivery in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer cash on delivery across Pakistan.",
      },
    },
    {
      "@type": "Question",
      name: "Is your jewelry handmade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all our jewelry is handcrafted with premium materials.",
      },
    },
    {
      "@type": "Question",
      name: "What type of jewelry do you sell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We sell earrings, rings, necklaces, bridal jewelry, and luxury accessories.",
      },
    },
  ],
}

/* ---------------- PAGE ---------------- */
export default function Page() {
  return (
    <>
      {/* JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* MAIN CLIENT PAGE */}
      <ProductsClient />
    </>
  )
}