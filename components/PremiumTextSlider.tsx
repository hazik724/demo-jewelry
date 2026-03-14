"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slogans = [
  "Elegance Redefined",
  "Luxury in Every Detail",
  "Crafted for Perfection",
  "Where Fashion Meets Art",
];

export default function LuxuryHeroText() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slogans.length);
    }, 4500); // change slogan every 4.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[30vh] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-[2rem] md:text-[1rem] lg:text-[6rem] font-light tracking-wide text-black"
        >
          {slogans[current].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                delay: index * 0.05, // stagger letters
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>

     
    </div>
  );
}