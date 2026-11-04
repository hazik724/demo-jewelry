"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { urlFor } from "@/sanity/lib/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface Props {
  images: any[]
  productTitle?: string
}

export default function ProductGallery({ images, productTitle = "Product" }: Props) {
  const [selected, setSelected] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 })
  const [fsZoomed, setFsZoomed] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const safeImages = useMemo(
    () => (images?.length ? images : ["/placeholder.png"]),
    [images]
  )

  const mainImages = useMemo(() => {
    return safeImages.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(1400).auto("format").quality(85).url()
    )
  }, [safeImages])

  const thumbImages = useMemo(() => {
    return safeImages.map((img) =>
      typeof img === "string"
        ? img
        : urlFor(img).width(200).auto("format").quality(70).url()
    )
  }, [safeImages])

  const handleSelect = useCallback((index: number) => {
    setSelected(index)
  }, [])

  const goNext = useCallback(() => {
    setSelected((s) => (s < mainImages.length - 1 ? s + 1 : s))
  }, [mainImages.length])

  const goPrev = useCallback(() => {
    setSelected((s) => (s > 0 ? s - 1 : s))
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomOrigin({ x, y })
  }

  return (
    <div className="w-full space-y-4">

      {/* ===================== MAIN CAROUSEL ===================== */}
      <div className="relative overflow-hidden bg-neutral-100 group">

        {/* swipe / drag container */}
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80 && selected < mainImages.length - 1) {
              setSelected(selected + 1)
            } else if (info.offset.x > 80 && selected > 0) {
              setSelected(selected - 1)
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Apple-like easing
              }}
              ref={imageRef}
              className="relative w-full h-[50vh] md:h-[80vh] cursor-zoom-in overflow-hidden"
              onClick={() => setFullscreen(true)}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={mainImages[selected]}
                alt={`${productTitle} — photo ${selected + 1} of ${mainImages.length}`}
                fill
                priority={selected === 0}
                sizes="100vw"
                className="object-cover scale-[1.02] hidden md:block transition-transform duration-200 ease-out"
                style={
                  isZoomed
                    ? {
                        transform: "scale(1.9)",
                        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                      }
                    : undefined
                }
              />

              {/* mobile — no hover zoom, plain image */}
              <Image
                src={mainImages[selected]}
                alt={`${productTitle} — photo ${selected + 1} of ${mainImages.length}`}
                fill
                priority={selected === 0}
                sizes="100vw"
                className="object-cover scale-[1.02] block md:hidden"
              />

              {/* soft premium lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ZOOM HINT — desktop only, fades in on hover */}
        <div className="hidden md:flex absolute bottom-4 right-4 items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <ZoomIn size={12} strokeWidth={1.5} />
          Hover to zoom
        </div>

        {/* IMAGE COUNTER */}
        {mainImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[11px] tracking-wide px-2.5 py-1 pointer-events-none">
            {selected + 1} / {mainImages.length}
          </div>
        )}

        {/* LEFT / RIGHT NAV (Apple style subtle controls) */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            disabled={selected === 0}
            className="
              pointer-events-auto
              w-11 h-11
              rounded-full
              bg-white/70
              backdrop-blur-xl
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              flex items-center justify-center
              text-slate-700
              hover:bg-white
              hover:scale-110
              transition-all
              duration-300
              disabled:opacity-0
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            disabled={selected === mainImages.length - 1}
            className="
              pointer-events-auto
              w-11 h-11
              rounded-full
              bg-white/70
              backdrop-blur-xl
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              flex items-center justify-center
              text-slate-700
              hover:bg-white
              hover:scale-110
              transition-all
              duration-300
              disabled:opacity-0
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </div>

      {/* ===================== THUMBNAIL RAIL ===================== */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {thumbImages.map((img, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: selected === index ? 1.05 : 0.95,
              opacity: selected === index ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`mt-1
              relative min-w-[70px] h-[70px] overflow-hidden
              border transition
              ${
                selected === index
                  ? "border-[#547792]"
                  : "border-neutral-200"
              }
            `}
          >
            <Image
              src={img}
              alt={`${productTitle} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* ===================== FULLSCREEN ===================== */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => {
              setFullscreen(false)
              setFsZoomed(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={mainImages[selected]}
                alt={`${productTitle} — full view, photo ${selected + 1} of ${mainImages.length}`}
                width={1400}
                height={1400}
                onDoubleClick={() => setFsZoomed((z) => !z)}
                className={`object-contain max-h-[90vh] max-w-[90vw] transition-transform duration-300 ${
                  fsZoomed ? "scale-[1.8] cursor-zoom-out" : "cursor-zoom-in"
                }`}
              />

              {/* FULLSCREEN NEXT / PREV */}
              {mainImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setFsZoomed(false)
                      goPrev()
                    }}
                    disabled={selected === 0}
                    className="
                      absolute left-4 md:left-8 top-1/2 -translate-y-1/2
                      w-11 h-11 rounded-full
                      bg-white/10 backdrop-blur-xl
                      flex items-center justify-center
                      text-white hover:bg-white/20
                      transition-all duration-300
                      disabled:opacity-20 disabled:pointer-events-none
                    "
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setFsZoomed(false)
                      goNext()
                    }}
                    disabled={selected === mainImages.length - 1}
                    className="
                      absolute right-4 md:right-8 top-1/2 -translate-y-1/2
                      w-11 h-11 rounded-full
                      bg-white/10 backdrop-blur-xl
                      flex items-center justify-center
                      text-white hover:bg-white/20
                      transition-all duration-300
                      disabled:opacity-20 disabled:pointer-events-none
                    "
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>

            {/* CLOSE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setFullscreen(false)
                setFsZoomed(false)
              }}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            >
              <X size={16} />
            </button>

            {/* COUNTER + HINT */}
            <div className="absolute top-6 left-6 text-white text-[11px] tracking-[0.2em] uppercase opacity-70">
              {selected + 1} / {mainImages.length}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-[10px] tracking-[0.25em] uppercase opacity-50">
              Double-tap to zoom · Tap background to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}