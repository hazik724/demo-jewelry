"use client"

import Image from "next/image"

export default function HeroBanner() {
  return (
    <section className="w-full bg-[FAFAFA] py-10 md:py-16">

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-10">

        {/* LEFT CONTENT */}
        <div className="order-2 md:order-1">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
            Luxury Collection
          </p>

          <h1 className="text-4xl font-light leading-tight text-black md:text-6xl">
            Timeless Jewelry
            <span className="block font-semibold">
              For Modern Elegance
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-600">
            Discover handcrafted premium jewelry designed
            with sophistication, luxury, and elegance.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition hover:scale-105">
              Shop Now
            </button>

            <button className="rounded-full border border-black/20 px-8 py-3 text-sm font-medium text-black transition hover:bg-black hover:text-white">
              Explore
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative order-1 h-[500px] overflow-hidden md:order-2">

          <Image
            src="/hero/hello.jpg"
            alt="Luxury Jewelry"
            fill
            priority
            sizes="50vw"
            className="object-cover transition duration-700 hover:scale-105"
          />

        </div>

      </div>
    </section>
  )
}