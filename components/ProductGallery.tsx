"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export default function ProductGallery({ images }: { images: any[] }) {
  const [selected, setSelected] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const safeImages = images?.length ? images : ["/placeholder.png"]

  // ✅ Memoized URLs
  const mainImages = useMemo(() => {
    return safeImages.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(1200).url()
    )
  }, [safeImages])

  const thumbImages = useMemo(() => {
    return safeImages.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(200).url()
    )
  }, [safeImages])

  return (
    <div className="w-full">

      {/* MAIN IMAGE */}
      <div
        className="relative w-full h-[70vh] md:h-auto md:aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer"
        onClick={() => setFullscreen(true)}
      >
        <Image
          src={mainImages[selected]}
          alt="product"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selected === 0}
          className="object-cover transition duration-500"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
        {thumbImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`relative min-w-[65px] h-[65px] overflow-hidden border ${
              selected === index ? "border-black" : "border-neutral-300"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              sizes="65px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* 💎 FULLSCREEN VIEW (MOBILE ONLY FEEL) */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <Image
            src={mainImages[selected]}
            alt="fullscreen product"
            fill
            className="object-contain"
            sizes="100vw"
          />

          {/* close hint */}
          <div className="absolute top-5 right-5 text-white text-xs tracking-[0.3em] uppercase opacity-70">
            Tap to close
          </div>
        </div>
      )}

    </div>
  )
}