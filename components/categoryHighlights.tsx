"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { motion } from "framer-motion"

interface Category {
  title: string
  slug: { current: string }
  image: any
}

export default function CategoryHighlight() {
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
    <section className="bg-black text-white py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-6">
            Explore
          </p>

          <h2 className="text-3xl md:text-5xl font-light tracking-wide">
            Shop by Category
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {categories.map((category, index) => {
            const imageUrl = category.image
              ? urlFor(category.image).width(1400).height(1600).url()
              : "/placeholder.png"

            return (
              <motion.div
                key={category.slug.current}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/category/${category.slug.current}`}
                  className="group relative block h-[520px] overflow-hidden"
                >
                  {/* Image */}
                  <Image
                    src={imageUrl}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition duration-700" />

                  {/* Title */}
                  <div className="absolute inset-0 flex items-end justify-center pb-16">
                    <h3 className="text-xl md:text-2xl tracking-[0.3em] uppercase font-light text-center">
                      {category.title}
                    </h3>
                  </div>

                  {/* Minimal bottom line on hover */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-24"></div>

                </Link>
              </motion.div>
            )
          })}

        </div>
      </div>
    </section>
  )
}