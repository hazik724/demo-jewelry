"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

interface Category {
  title: string
  slug: { current: string }
  image: any
}

export default function LuxuryCategoryHome() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{
        title,
        slug,
        image
      }`

      const result = await client.fetch(query)
      setCategories(result)
    }

    fetchCategories()
  }, [])

  return (
    <section className="py-28">

      {/* HEADER */}
      <div className="text-center mb-20 px-6">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-6">
          Explore
        </p>

        <h2 className="text-4xl md:text-5xl font-light tracking-tight">
          Shop by Collection
        </h2>

        <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto">
          Discover handcrafted jewelry designed with elegance and precision.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">

          {categories.map((category, index) => {
            const imageUrl = category.image
              ? urlFor(category.image)
                  .width(600)
                  .height(750)
                  .quality(70)
                  .auto("format")
                  .url()
              : "/placeholder.png"

            return (
              <div key={category.slug.current}>
                <Link
                  href={`/category/${category.slug.current}`}
                  className="group block"
                  prefetch
                >

                  {/* IMAGE */}
                  <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden bg-gray-100">

                    <Image
                      src={imageUrl}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading={index < 2 ? "eager" : "lazy"}
                      priority={index === 0}
                      className="
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-105
                      "
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  </div>

                  {/* TEXT */}
                  <div className="mt-5 text-center">
                    <h3 className="text-xs md:text-sm tracking-[0.3em] uppercase font-light text-gray-800 group-hover:text-[#2FA084] transition">
                      {category.title}
                    </h3>

                    <div className="w-0 h-[1px] bg-[#2FA084] mx-auto mt-2 group-hover:w-12 transition-all duration-500" />
                  </div>

                </Link>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}