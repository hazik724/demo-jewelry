import AboutClient from "./AboutClient"
import type { Metadata } from "next"

/* ✅ SEO LAYER */
export const metadata: Metadata = {
  title: "About Jhumkara by Zyra | Luxury Jewelry Pakistan",
  description:
    "Jhumkara by Zyra is a premium handcrafted jewelry brand in Pakistan. Discover elegant earrings, rings, and necklaces designed for modern luxury.",

  alternates: {
    canonical: "https://jhumkara.com/about",
  },

  openGraph: {
    title: "About Jhumkara by Zyra",
    description:
      "Luxury handcrafted jewelry brand in Pakistan blending heritage and modern design.",
    url: "https://jhumkara.com/about",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Jhumkara by Zyra",
    description: "Premium jewelry brand in Pakistan.",
  },
}

export default function Page() {
  return <AboutClient />
}