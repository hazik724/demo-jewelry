"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useMemo } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { motion, useAnimation } from "framer-motion"

interface Category {
  title: string
  slug: { current: string }
  image: any
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([])
  const controls = useAnimation()

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

  const categoryData = useMemo(() => {
    const mapped = categories.map((category) => ({
      ...category,
      imageUrl: category.image
        ? urlFor(category.image).width(800).height(1000).url()
        : "/placeholder.png",
    }))

    return [...mapped, ...mapped] // infinite loop trick
  }, [categories])

  // 🔥 auto animation
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 25,
        ease: "linear",
      },
    })
  }, [controls])

  return (
    <section className="bg-[#2FA084] text-white py-24 overflow-hidden">

      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <p className="text-xs tracking-[0.5em] uppercase mb-4 text-white/70">
          Explore
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-wide">
          Shop by Category
        </h2>
      </div>

      <div className="relative">

        {/* Gradient edges */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#2FA084] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#2FA084] to-transparent z-10" />

        <motion.div
         className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }} // loose constraint for UX
          onMouseEnter={() => controls.stop()} // pause on hover
          onMouseLeave={() => {
            controls.start({
              x: ["0%", "-50%"],
              transition: {
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              },
            })
          }}
        >
          {categoryData.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.slug.current}`}
              className="group relative w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] md:w-[300px] md:h-[400px] flex-shrink-0 overflow-hidden  "
            >
              {/* Image */}
              <Image
                src={category.imageUrl}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />

              {/* Title */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <h3 className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-light">
                  {category.title}
                </h3>

                <div className="w-0 h-[1px] bg-white mx-auto mt-2 transition-all duration-500 group-hover:w-12" />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}