"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { urlFor } from "@/sanity/lib/image"
import { motion } from "framer-motion"

interface Category {
  title: string
  slug: { current: string }
  image: any
}

export default function LuxuryCategoryUI({
  categories,
}: {
  categories: Category[]
}) {
  const [active, setActive] = useState(0)

  const activeCategory = categories[active]

  return (
    <div className="bg-[#f7f7f5] min-h-screen">

      {/* HEADER */}
      <div className="text-center py-24 px-6">
        <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-6">
          Explore
        </p>

        <h1 className="text-4xl md:text-6xl font-light tracking-tight">
          Collections
        </h1>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-2 max-w-7xl mx-auto px-6 gap-16 items-center pb-24">

        {/* LEFT */}
        <div className="space-y-10">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug.current}
              href={`/category/${cat.slug.current}`}
              onMouseEnter={() => setActive(index)}
              className="group block"
            >
              <h2
                className={`text-2xl font-light tracking-[0.25em] uppercase transition-all duration-500
                ${active === index ? "text-black" : "text-gray-400"}`}
              >
                {cat.title}
              </h2>

              <div
                className={`h-[1px] bg-[#2FA084] mt-3 transition-all duration-500
                ${active === index ? "w-16" : "w-0"}`}
              />
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-gray-100">
          {activeCategory && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={
                  activeCategory.image
                    ? urlFor(activeCategory.image).width(1200).height(1400).url()
                    : "/placeholder.png"
                }
                alt={activeCategory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden px-6 pb-20 space-y-6">
        {categories.map((cat) => {
          const imageUrl = cat.image
            ? urlFor(cat.image).width(800).height(1000).url()
            : "/placeholder.png"

          return (
            <Link
              key={cat.slug.current}
              href={`/category/${cat.slug.current}`}
              className="group block"
            >
              <div className="relative h-[220px]  overflow-hidden">

                <Image
                  src={imageUrl}
                  alt={cat.title}
                  fill
                  className="object-cover transition duration-[2000ms] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                  <h3 className="text-xs tracking-[0.3em] uppercase font-light text-white">
                    {cat.title}
                  </h3>
                </div>

              </div>
            </Link>
          )
        })}
      </div>

    </div>
  )
}