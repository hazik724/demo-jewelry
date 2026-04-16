"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {

  const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Jhumkara by Zyra",
  url: "https://jhumkara.com",
  logo: "https://jhumkara.com/logo.png",
  sameAs: [
    "https://instagram.com/yourbrand",
  ],
}
  return (

    <div className="bg-black text-white overflow-hidden">

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema),
  }}
/>

      {/* 🌟 HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">

        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0"
          alt="Luxury Jewelry"
          fill
          className="object-cover opacity-40 scale-110"
          priority
        />

        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

        {/* Floating Glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#2FA084]/10 blur-3xl rounded-full animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-serif tracking-[0.3em]">
            JHUMKARA
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-2xl tracking-wide">
            by Zyra — Where Heritage Meets Modern Luxury
          </p>

          <Link href="/product">
            <button className="mt-10 px-10 py-4 border border-[#2FA084] text-[#2FA084] tracking-widest uppercase hover:bg-[#2FA084] hover:text-black transition duration-500 shadow-lg">
              Explore Collection
            </button>
          </Link>
        </motion.div>
      </section>

      {/* 📖 OUR STORY */}
      <section className="max-w-6xl mx-auto py-32 px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif mb-6">Our Story</h2>

          <p className="text-gray-300 leading-relaxed text-lg">
            Jhumkara by Zyra was born from a vision to redefine luxury jewelry —
            blending South Asian heritage with modern elegance. Every piece is
            handcrafted with precision, emotion, and timeless artistry.
          </p>

          <p className="mt-4 text-gray-400">
            We don’t just create jewelry. We create identity, presence, and power.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { year: "2026", text: "The birth of Jhumkara by Zyra" },
              { year: "2027", text: "Crafting signature heritage collection" },
              { year: "2028", text: "Global recognition in luxury fashion circles" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between bg-white/5 border border-[#2FA084]/30 p-4 rounded-xl backdrop-blur-md"
              >
                <span className="text-[#2FA084]">{item.year}</span>
                <span className="text-gray-300 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[500px] rounded-2xl overflow-hidden"
        >
          <Image
            src="/hero/enter.jpeg"
            alt="Jewelry Craft"
            fill
            className="object-cover"
          />
         
        </motion.div>
      </section>

      {/* ✨ CRAFTSMANSHIP */}
      <section className="relative py-32 px-6 md:px-12 bg-neutral-950">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-6">Craftsmanship</h2>
            <p className="text-gray-300 leading-relaxed">
              Each Jhumkara piece is shaped by master artisans using premium
              materials and traditional techniques refined through generations.
            </p>

            <p className="mt-4 text-gray-400">
              Every curve, every detail, every shine — intentionally crafted.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ scale: 1 }}
            initial={{ scale: 1.1 }}
            transition={{ duration: 1 }}
            className="relative h-[420px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638"
              alt="Luxury Craft"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 💎 PHILOSOPHY */}
      <section className="text-center py-32 px-6">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-serif"
        >
          Luxury Philosophy
        </motion.h2>

        <div className="mt-12 space-y-6 text-xl text-gray-300">
          <p className="italic">“Luxury is not loud. It is felt.”</p>
          <p className="italic">“Every piece carries a story.”</p>
          <p className="italic">“Elegance is power in silence.”</p>
        </div>
      </section>

      {/* 🌿 ETHICS */}
      <section className="py-32 px-6 bg-neutral-950 text-center">

        <h2 className="text-4xl font-serif mb-12">Ethics & Sustainability</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            { title: "Ethical Sourcing", desc: "Responsibly selected materials." },
            { title: "Handcrafted", desc: "Artisan-led creation process." },
            { title: "Timeless Quality", desc: "Built to last generations." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-[#2FA084]/20 p-6 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-[#2FA084] text-xl mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

     

      {/* 🔥 FINAL CTA */}
      <section className="relative py-40 text-center">

        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#2FA084]/10 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <h2 className="text-4xl font-serif mb-6">
            Adorn yourself in timeless elegance.
          </h2>

          <Link href="/product">
            <button className="px-10 py-4 border border-[#2FA084] text-[#2FA084] uppercase tracking-widest hover:bg-[#2FA084] hover:text-black transition duration-500">
              Discover Jhumkara
            </button>
          </Link>
        </motion.div>
      </section>

    </div>
  )
}