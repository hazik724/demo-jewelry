"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function PremiumTrustSection() {
  const stats = [
    { value: "1K+", label: "Happy Customers" },
    { value: "500+", label: "Premium Products" },
    { value: "4.9★", label: "Customer Rating" },
  ]

  return (
    <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">

        {/* PREMIUM LOGO BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="relative p-5 rounded-3xl bg-white shadow-lg border border-gray-100">

            {/* soft glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#2FA084]/20 to-transparent blur-2xl opacity-60"></div>

            <Image
              src="/hero/enter.jpeg"
              alt="ZYRA Logo"
              width={70}
              height={70}
              className="relative object-contain"
            />
          </div>

          <p className="mt-6 text-xs tracking-[0.5em] text-gray-400 uppercase">
            JHUMKAARA BY ZYRA
          </p>
        </motion.div>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-5xl font-light tracking-wide mb-6 leading-tight"
        >
          Crafted for Those Who Value Quality
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-500 max-w-2xl mx-auto mb-16 text-sm md:text-base"
        >
          Every product is designed with precision, premium materials, and attention to detail — trusted by thousands who expect nothing but excellence.
        </motion.p>

        {/* TRUST BADGES */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-16 text-xs tracking-wide uppercase text-gray-600"
        >
          <span className="px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
            Secure Checkout
          </span>
          <span className="px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
            Fast Delivery
          </span>
          <span className="px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
            Premium Quality
          </span>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-3xl md:text-4xl font-semibold ">
                {item.value}
              </h3>
              <p className="text-gray-500 mt-3 text-sm tracking-wide">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}