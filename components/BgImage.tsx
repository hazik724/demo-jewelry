"use client"

import Image from "next/image"

export default function HeroBanner() {
  return (
    <section className="w-full">

      {/* FULL BLEED WRAPPER */}
      <div className="relative w-full h-[400px] md:h-[500px]">

        <Image
          src="/hero/hello.jpg"
          alt="Banner"
          fill
          priority
          sizes="100vh"
          className="object-cover"
        />

      </div>

    </section>
  )
}