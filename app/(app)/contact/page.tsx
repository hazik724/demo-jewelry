"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState } from "react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Magnetic Button Effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      setForm({ name: "", email: "", message: "" })
    }
  }

 return (
  <div className="min-h-screen bg-[#f7f7f5] text-[#111] relative overflow-hidden">

    {/* Very subtle luxury glow */}
    <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#2FA084]/5 blur-3xl rounded-full" />
    <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-[#2FA084]/5 blur-3xl rounded-full" />

    <div className="max-w-5xl mx-auto px-6 py-28">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-24"
      >
        <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-6">
          Contact
        </p>

        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
          Let’s Create Something Timeless
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Every message is read personally. We value meaningful connections.
        </p>
      </motion.div>

      {/* FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl mx-auto"
      >

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* INPUTS */}
            {["name", "email"].map((field) => (
              <div key={field} className="relative">

                <input
                  type={field === "email" ? "email" : "text"}
                  required
                  value={(form as any)[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  placeholder=" "
                  className="w-full border-b border-gray-300 py-4 bg-transparent outline-none focus:border-[#2FA084] transition"
                />

                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all">
                  {field === "name" ? "Your Name" : "Your Email"}
                </label>

              </div>
            ))}

            {/* MESSAGE */}
            <div className="relative">

              <textarea
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder=" "
                className="w-full border-b border-gray-300 py-4 bg-transparent outline-none focus:border-[#2FA084] transition h-32 resize-none"
              />

              <label className="absolute left-0 top-2 text-gray-400 text-sm">
                Your Message
              </label>

            </div>

            {/* BUTTON */}
            <motion.button
              style={{ x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                x.set(0)
                y.set(0)
              }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 w-full py-4 border border-[#2FA084] text-[#2FA084] tracking-[0.3em] uppercase text-sm hover:bg-[#2FA084] hover:text-white transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

          </form>
        ) : (
          <div className="text-center py-16">

            <div className="text-3xl mb-6 text-[#2FA084]">✓</div>

            <h2 className="text-2xl font-light mb-3">
              Message Received
            </h2>

            <p className="text-gray-500 text-sm">
              We’ll respond with care shortly.
            </p>

          </div>
        )}

      </motion.div>

      {/* CONTACT INFO */}
      <div className="grid md:grid-cols-3 gap-14 mt-28 text-center">

        {[
          { title: "Email", value: "malihajamshad@gmail.com" },
          { title: "Phone", value: "+92 308 3366699" },
          { title: "Location", value: "Pakistan" },
        ].map((item) => (
          <div key={item.title} className="space-y-3">

            <h3 className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
              {item.title}
            </h3>

            <p className="text-sm md:text-base text-gray-700 hover:text-[#2FA084] transition cursor-pointer">
              {item.value}
            </p>

          </div>
        ))}

      </div>

    </div>
  </div>
)
}