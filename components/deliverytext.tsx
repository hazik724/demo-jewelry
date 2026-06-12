"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const messages = [
  "Custom jewelry shipping takes 8–10 days",
   "Custom jewelry shipping takes 8–10 days",
   "Custom jewelry shipping takes 8–10 days",
]

export default function PremiumShippingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex justify-center py-4">
      <div className="text-center overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>

      </div>
    </div>
  )
}