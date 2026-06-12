"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { client } from "@/sanity/lib/client"

interface Category {
  title: string
  slug: { current: string }
}

export default function LuxuryCategoryNav() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{
        title,
        slug
      }`

      const result = await client.fetch(query)
      setCategories(result)
    }

    fetchCategories()
  }, [])

  return (
    <section className="bg-[#2FA084] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60">
            Discover
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mt-3">
            ZYRA Collections
          </h2>
        </div>

        {/* Grid Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">

          {categories.map((category, index) => (
            <Link
              key={category.slug.current}
              href={`/category/${category.slug.current}`}
              className="group relative flex items-center justify-between py-5 border-b border-white/15 hover:border-white/40 transition-all duration-500"
            >

              {/* Left number (luxury index style) */}
              <span className="text-white/40 text-xs tracking-[0.3em] group-hover:text-white transition">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <span className="text-sm md:text-base font-light tracking-[0.25em] uppercase group-hover:tracking-[0.35em] transition-all duration-500">
                {category.title}
              </span>

              {/* Arrow indicator */}
              <span className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                →
              </span>

              {/* Glow underline effect */}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}

        </div>
      </div>
    </section>
  )
}