"use client"

import { useEffect, useRef, useState } from "react"

const texts = [
  "FREE WORLDWIDE SHIPPING",
  "PREMIUM QUALITY MATERIALS",
  "NEW COLLECTION AVAILABLE",
  "30-DAY RETURNS",
  "LIMITED EDITION PRODUCTS",
]

export default function CinematicTextSlider() {
  const [isClient, setIsClient] = useState(false)
  const [scrollPaused, setScrollPaused] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null // prevent SSR mismatch

  return (
    <div
      className="slider-container"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "2rem 0",
        backgroundColor: "#fff",
      }}
      onMouseEnter={() => setScrollPaused(true)}
      onMouseLeave={() => setScrollPaused(false)}
    >
      {/* Slider lines */}
      <div
        style={{
          display: "flex",
          gap: "4rem",
          whiteSpace: "nowrap",
          animation: `marquee 30s linear infinite`,
          animationPlayState: scrollPaused ? "paused" : "running",
        }}
      >
        {[...texts, ...texts].map((t, i) => (
          <span key={i} style={{ fontWeight: 300, letterSpacing: "0.2em", color: "#222" }}>
            {t}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "4rem",
          whiteSpace: "nowrap",
          marginTop: "1rem",
          animation: `marqueeReverse 35s linear infinite`,
          animationPlayState: scrollPaused ? "paused" : "running",
        }}
      >
        {[...texts, ...texts].map((t, i) => (
          <span key={i + 100} style={{ fontWeight: 300, letterSpacing: "0.2em", color: "#222" }}>
            {t}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}