"use client"

import { motion, AnimatePresence } from "framer-motion"

export default function LuxuryLoader() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Brand Circle Loader */}
        <motion.div
          className="w-20 h-20 border-4 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />

        {/* Optional Brand Name */}
        <motion.span
          className="mt-6 text-white text-lg tracking-widest uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ZYRA
        </motion.span>
      </motion.div>
    </AnimatePresence>
  )
}