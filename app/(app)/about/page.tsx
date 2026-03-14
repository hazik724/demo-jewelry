"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="text-white bg-black">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1520975922284-7b2a1b8d5d05')"}}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-serif tracking-widest mb-4">ZYRA</h1>
          <p className="text-gray-300 text-lg md:text-2xl mb-8">
            Premium Fashion for the Modern Icon
          </p>
          <Link href="/product">
            <button className="px-8 py-4 bg-gold-500 text-black font-semibold uppercase tracking-widest rounded-2xl shadow-2xl hover:brightness-110 transition">
              Explore Collection
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center md:text-left space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Story</h2>
          <p className="text-gray-400 leading-relaxed text-lg md:text-xl">
            Founded in 2026, ZYRA is dedicated to redefining modern fashion. Our mission is to craft timeless pieces that embody elegance, confidence, and individuality. From our first collection to today, every design tells a story of sophistication and craftsmanship.
          </p>
          <div className="flex justify-center md:justify-start mt-8 gap-6 flex-wrap">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold">2026</h3>
              <p className="text-gray-400 text-sm mt-2">ZYRA is founded, crafting first exclusive collection.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold">2027</h3>
              <p className="text-gray-400 text-sm mt-2">Introduced sustainable materials in all designs.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold">2028</h3>
              <p className="text-gray-400 text-sm mt-2">Expanded to international fashion shows and collaborations.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Product Philosophy Section */}
      <section className="bg-neutral-900 py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-serif mb-4">Our Philosophy</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At ZYRA, every garment is carefully designed with attention to detail and premium materials. We believe fashion should empower and inspire. Our collections blend modern aesthetics with timeless craftsmanship, ensuring each piece is a statement of elegance and individuality.
            </p>
          </div>
          <div className="relative h-96 md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
              alt="Product Philosophy"
              fill
              className="object-cover rounded-3xl border border-gold-500 shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* Sustainability & Ethics */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl font-serif">Sustainability & Ethics</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            We are committed to sustainable fashion, ensuring our materials and processes respect the environment. From ethically sourced fabrics to eco-conscious packaging, ZYRA is redefining luxury with responsibility.
          </p>
          <div className="flex justify-center gap-8 flex-wrap mt-12">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold">Ethical</h3>
              <p className="text-gray-400 text-sm mt-2">Fair labor and responsible practices.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold">Sustainable</h3>
              <p className="text-gray-400 text-sm mt-2">Eco-conscious materials and processes.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-gray-400 text-sm mt-2">Luxury craftsmanship in every detail.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Policies Section */}
      <section className="bg-neutral-950 py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center space-y-12"
        >
          <h2 className="text-4xl font-serif">Policies & Customer Info</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Privacy Policy</h3>
              <p className="text-gray-400 text-sm">
                Your data is safe with us. We never share customer information with third parties.
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Shipping & Returns</h3>
              <p className="text-gray-400 text-sm">
                Fast domestic and international shipping. Easy returns within 30 days.
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-gold-500 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Terms & Conditions</h3>
              <p className="text-gray-400 text-sm">
                Read our terms for purchase, delivery, and usage of ZYRA products.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Press & Collaborations */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center space-y-12"
        >
          <h2 className="text-4xl font-serif">Press & Collaborations</h2>
          <div className="flex justify-center gap-12 flex-wrap mt-8">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/0/03/Vogue_logo.svg" alt="Vogue" width={120} height={40} />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Elle_logo.svg" alt="Elle" width={120} height={40} />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Harper%27s_Bazaar_logo.svg" alt="Harper's Bazaar" width={120} height={40} />
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="bg-black py-24 px-6 text-center">
        <h2 className="text-4xl font-serif mb-6">Experience Luxury with ZYRA</h2>
        <Link href="/product">
          <button className="px-10 py-4 bg-gold-500 text-black font-semibold uppercase tracking-widest rounded-2xl shadow-2xl hover:brightness-110 transition">
            Shop the Collection
          </button>
        </Link>
      </section>

    </div>
  )
}