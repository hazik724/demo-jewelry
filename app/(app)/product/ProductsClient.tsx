"use client"

import { useEffect, useState, useMemo } from "react"
import { client } from "@/sanity/lib/client"
import ProductCard from "@/components/ProductCard"

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

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState("newest")

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] | order(_createdAt desc){
        _id,
        title,
        slug,
        images,
        price,
        discountPrice,
        variants
      }`

      const result = await client.fetch(query)
      setProducts(result)
    }

    fetchProducts()
  }, [])

  /* ---------------- SORT ONLY (NO FILTERS) ---------------- */
  const sortedProducts = useMemo(() => {
    let updated = [...products]

    if (sortOption === "price-low") {
      return updated.sort(
        (a, b) =>
          (a.discountPrice ?? a.price) -
          (b.discountPrice ?? b.price)
      )
    }

    if (sortOption === "price-high") {
      return updated.sort(
        (a, b) =>
          (b.discountPrice ?? b.price) -
          (a.discountPrice ?? a.price)
      )
    }

    // newest (default from query already)
    return updated
  }, [products, sortOption])

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-20">

      {/* ---------------- SEO FALLBACK ---------------- */}
      <noscript>
        <h1>Buy Jewelry Online in Pakistan</h1>
        <p>
          Explore premium handcrafted jewelry including earrings, rings,
          necklaces, and luxury accessories by Jhumkara by Zyra.
        </p>
      </noscript>

      {/* ---------------- HEADER ---------------- */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-light tracking-[0.15em] mb-4">
          Jewelry Collection Of ZYRA
        </h1>

        <p className="text-sm text-gray-500 tracking-widest uppercase">
          {sortedProducts.length} Premium Pieces Available
        </p>

        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm">
          Explore premium handcrafted jewelry including earrings, rings,
          necklaces, and luxury accessories designed for modern elegance.
        </p>
      </header>

      {/* ---------------- SORT ONLY CONTROLS ---------------- */}
      <section
        className="flex justify-end items-center mb-12 border-b pb-6"
        aria-label="Product sorting"
      >
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm tracking-widest uppercase bg-transparent outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </section>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <section aria-label="Jewelry products list">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <li key={product._id}>
                <ProductCard product={product} />
              </li>
            ))
          ) : (
            <li className="col-span-full text-center text-gray-400">
              No products found.
            </li>
          )}
        </ul>
      </section>

    </main>
  )
}