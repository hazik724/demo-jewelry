"use client"

import { useState } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

export default function ProductGallery({ images }: { images: any[] }) {
  const [selected, setSelected] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-square bg-neutral-100">
        <Image src="/placeholder.png" alt="placeholder" fill className="object-cover" />
      </div>
    )
  }

  return (
    <div className="w-full">

      {/* MAIN IMAGE */}
      <div className="relative w-full h-[70vh] md:h-auto md:aspect-[4/5] bg-neutral-100 overflow-hidden">
        <Image
          src={urlFor(images[selected]).width(1200).url()}
          alt="product"
          fill
          priority
          className="object-cover transition duration-500"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`relative min-w-[65px] h-[65px]  overflow-hidden border ${
              selected === index ? "border-black" : "border-neutral-300"
            }`}
          >
            <Image
              src={urlFor(img).width(200).url()}
              alt="thumb"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  )
}