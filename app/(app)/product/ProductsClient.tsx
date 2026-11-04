"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import ProductCard from "@/components/ProductCard"

interface Category {
  title: string
  slug: { current: string }
}

interface Product {
  _id: string
  title: string
  slug: { current: string }
  images: any[]
  price: number
  compareAtPrice?: number
  categories?: Category[]
}

interface ProductsClientProps {
  initialProducts: Product[]
  categories: Category[]
}

const SORT_LABELS: Record<string, string> = {
  newest: "Newest",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
}

// Put your hero image in /public/hero/ and update this path.
const HERO_IMAGE_URL = "/hero/dd4.webp"

const PILL_BASE =
  "shrink-0 px-4 py-2 text-[11px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300"
const PILL_ACTIVE = "bg-[#2FA084] text-white border-[#2FA084]"
const PILL_IDLE =
  "border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"

export default function ProductsClient({
  initialProducts,
  categories,
}: ProductsClientProps) {
  const [sortOption, setSortOption] = useState("newest")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [sortOpen, setSortOpen] = useState(false)

  /* ---------------- FILTER + SORT ---------------- */
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts]

    if (activeCategory !== "all") {
      list = list.filter((p) =>
        p.categories?.some((c) => c?.slug?.current === activeCategory)
      )
    }

    // Always sort by the real selling price. compareAtPrice is display-only.
    if (sortOption === "price-low") {
      list.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      list.sort((a, b) => b.price - a.price)
    }
    // "newest" keeps the server order (_createdAt desc)

    return list
  }, [initialProducts, activeCategory, sortOption])

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* ---------------- HERO IMAGE HEADER ---------------- */}
      <header className="relative border-b border-neutral-200 bg-neutral-950 overflow-hidden h-[30vh] md:h-[45vh]">
        <Image
          src={HERO_IMAGE_URL}
          alt="Jhumkara by Zyra handcrafted jewelry collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />

        {/* OVERLAID HERO TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/70 mb-5 animate-fade-in">
            Jhumkara by Zyra
          </p>
          <h1
            className="text-4xl md:text-7xl font-light tracking-tight text-white mb-6 animate-fade-in"
            style={{ animationDelay: "120ms" }}
          >
            Jewelry Collection
          </h1>
          <p
            className="mx-auto max-w-xl text-sm md:text-base text-white/80 leading-relaxed animate-fade-in"
            style={{ animationDelay: "220ms" }}
          >
            Earrings, rings, necklaces, and luxury accessories, handcrafted
            for modern elegance.
          </p>
          <div
            className="mt-8 text-[11px] tracking-[0.3em] uppercase text-white/60 animate-fade-in"
            style={{ animationDelay: "320ms" }}
          >
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Piece" : "Pieces"} Available
          </div>
        </div>
      </header>

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="sticky top-0 z-20 bg-[#fafaf8]/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* CATEGORY PILLS */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={`${PILL_BASE} ${
                activeCategory === "all" ? PILL_ACTIVE : PILL_IDLE
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug.current}
                onClick={() => setActiveCategory(cat.slug.current)}
                className={`${PILL_BASE} ${
                  activeCategory === cat.slug.current ? PILL_ACTIVE : PILL_IDLE
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* SORT DROPDOWN */}
          <div className="relative shrink-0 self-end md:self-auto">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-neutral-700 border border-neutral-300 rounded-full px-4 py-2 hover:border-neutral-900 transition-colors"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              {SORT_LABELS[sortOption]}
              <ChevronDown
                size={13}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {Object.entries(SORT_LABELS).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => {
                        setSortOption(value)
                        setSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                        sortOption === value
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ACTIVE FILTER CHIP */}
        {activeCategory !== "all" && (
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full">
              {categories.find((c) => c.slug.current === activeCategory)?.title}
              <button
                onClick={() => setActiveCategory("all")}
                aria-label="Clear category filter"
              >
                <X size={12} strokeWidth={1.5} />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <section
        className="max-w-[1600px] mx-auto px-2 md:px-8 py-5"
        aria-label="Jewelry products list"
      >
        {filteredProducts.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5">
            {filteredProducts.map((product, i) => (
              <li
                key={product._id}
                className="group animate-fade-in"
                style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
              >
                <div className="overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <ProductCard product={product} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-24">
            <p className="text-sm tracking-[0.2em] uppercase text-neutral-400">
              No pieces found
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 text-[11px] tracking-[0.2em] uppercase underline underline-offset-4 text-neutral-600"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}