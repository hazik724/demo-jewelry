import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // improves performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jhumkara.com"),

  title: {
    default: "Jhumkara by Zyra | Premium Jewelry Store",
    template: "%s | Jhumkara by Zyra",
  },

  description:
    "Shop premium handcrafted jewelry at Jhumkara by Zyra. Discover elegant earrings, necklaces, and accessories designed for modern style.",

  keywords: [
    "jhumkara",
    "zyra jewelry",
    "handmade jewelry",
    "earrings pakistan",
    "necklace online",
    "women accessories",
  ],

  authors: [{ name: "Jhumkara by Zyra" }],
  creator: "Jhumkara by Zyra",
  publisher: "Jhumkara by Zyra",

  openGraph: {
    title: "Jhumkara by Zyra | Premium Jewelry Store",
    description:
      "Explore beautiful handcrafted jewelry at Jhumkara. Elegant, stylish, and perfect for every occasion.",
    url: "https://jhumkara.com",
    siteName: "Jhumkara",
    images: [
      {
        url: "/og-image.jpg", // add this image in public folder
        width: 1200,
        height: 630,
        alt: "Jhumkara Jewelry Collection",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jhumkara by Zyra",
    description:
      "Premium handcrafted jewelry for modern women.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://jhumkara.com",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        
      </body>
    </html>
  );
}