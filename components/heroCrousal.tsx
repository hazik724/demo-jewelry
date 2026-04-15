"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useCallback, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const slides = [
  {
    desktop: "/hero/dd1.jpg",
    mobile: "/hero/mobile-1.jpeg",
    label: "Luxury Collection",
    headline: "Timeless Gold Elegance",
    alt: "Luxury gold jewelry collection for women in Pakistan",
  },
  {
    desktop: "/hero/dd2.jpg",
    mobile: "/hero/mobile-2.jpeg",
    label: "New Arrival",
    headline: "Diamond Perfection",
    alt: "Diamond jewelry new arrivals elegant accessories",
  },
  {
    desktop: "/hero/dd3.jpg",
    mobile: "/hero/mobile-3.jpeg",
    label: "Exclusive",
    headline: "Crafted for Royalty",
    alt: "Premium handcrafted royal jewelry collection",
  },
  {
    desktop: "/hero/dd4.jpg",
    mobile: "/hero/mobile-4.jpeg",
    label: "Trending",
    headline: "Modern Jewelry Icons",
    alt: "Trending modern jewelry styles for women",
  },
  {
    desktop: "/hero/dd5.jpg",
    mobile: "/hero/last.jpeg",
    label: "Signature Pieces",
    headline: "Shine with Confidence",
    alt: "Signature jewelry pieces stylish accessories",
  },
]

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 40,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", onSelect)

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 7000)

    return () => {
      emblaApi.off("select", onSelect)
      clearInterval(interval)
    }
  }, [emblaApi, onSelect])

  return (
    <section
      className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-black"
      aria-label="Jhumkara Jewelry Hero Section"
    >

      {/* 🔥 Hidden SEO Content (Google reads this) */}
      <div className="sr-only">
        <h1>Jhumkara by Zyra - Premium Jewelry Store in Pakistan</h1>
        <p>
          Discover handcrafted jewelry including gold earrings, diamond sets,
          necklaces, and modern accessories designed for elegance and style.
        </p>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">

          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] h-full md:h-screen"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1}`}
            >

              {/* Desktop Image */}
              <Image
                src={slide.desktop}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                quality={90}
                className="object-cover hidden md:block"
              />

              {/* Mobile Image */}
              <Image
                src={slide.mobile}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                quality={90}
                className="object-cover block md:hidden"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-xs tracking-[0.5em] uppercase mb-6"
                >
                  {slide.label}
                </motion.p>

                {/* ⚠️ IMPORTANT: NOT H1 (we already used hidden H1) */}
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-4xl md:text-6xl font-light tracking-wide max-w-3xl"
                >
                  {slide.headline}
                </motion.h2>

                {/* ✅ Use Link instead of button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Link
                    href="/product"
                    className="mt-12 inline-block border border-white px-12 py-4 text-xs tracking-[0.4em] uppercase transition-colors duration-500 rounded-lg shadow-lg hover:shadow-xl hover:bg-white hover:text-black"
                    aria-label="Explore jewelry products"
                  >
                    Discover
                  </Link>
                </motion.div>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  )
}