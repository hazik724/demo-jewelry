"use client"

import { useState, useMemo, useCallback } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export default function ProductGallery({ images }: { images: any[] }) {
  const [selected, setSelected] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  // FIX 1: stable array
  const safeImages = useMemo(
    () => (images?.length ? images : ["/placeholder.png"]),
    [images]
  )

  // FIX 2: limit thumbnails for performance
  const thumbSource = useMemo(
    () => safeImages.slice(0, 6),
    [safeImages]
  )

  const mainImages = useMemo(() => {
    return safeImages.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(1000).auto("format").quality(75).url()
    )
  }, [safeImages])

  const thumbImages = useMemo(() => {
    return thumbSource.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(160).auto("format").quality(70).url()
    )
  }, [thumbSource])

  const handleSelect = useCallback((index: number) => {
    setSelected(index)
  }, [])

  return (
    <div className="w-full">

      {/* MAIN IMAGE */}
      <div
        className="relative w-full h-[70vh] md:aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer"
        onClick={() => setFullscreen(true)}
      >
        <Image
          src={mainImages[selected]}
          alt="product"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selected === 0}
          quality={75}
          className="object-cover transition duration-500"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
        {thumbImages.map((img, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`relative min-w-[60px] h-[60px] overflow-hidden border ${
              selected === index ? "border-black" : "border-neutral-300"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              sizes="60px"
              quality={60}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* FULLSCREEN */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <Image
            src={mainImages[selected]}
            alt="fullscreen product"
            width={1200}
            height={1200}
            quality={80}
            className="object-contain max-h-[90vh] max-w-[90vw]"
          />

          <div className="absolute top-5 right-5 text-white text-xs tracking-[0.3em] uppercase opacity-70">
            Tap to close
          </div>
        </div>
      )}
    </div>
  )
}