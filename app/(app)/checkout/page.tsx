"use client"

import { useState } from "react"
import { useCartStore } from "@/app/store/CartStore"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function CheckoutPage() {


  const [errors, setErrors] = useState<any>({})
  const { items, clearCart } = useCartStore()

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    deliveryInstructions: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleOrder = async () => {
    const newErrors: any = {}

if (!form.customerName) newErrors.customerName = "Full name is required"
if (!form.email) newErrors.email = "Email is requierd"
if (!form.phone) newErrors.phone = "Phone number is required"
if (!form.addressLine1) newErrors.addressLine1 = "Address is required"
if (!form.city) newErrors.city = "City is required"
if (!form.state) newErrors.state = "State is required"
if (!form.postalCode) newErrors.postalCode = "Postal code is required"

if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors)
  return
}

setErrors({})

    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          customerName: form.customerName,
          email: form.email,
          phone: form.phone,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
          deliveryInstructions: form.deliveryInstructions,

          userId: null,

          products: items.map((item) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),

          totalAmount: total,
        }),
      })

      const json = await res.json()

      if (json.success) {
        clearCart()
        setSuccess(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !success)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative">

      {/* Glow background */}
      <div className="absolute w-[400px] h-[400px] bg-gold-500/10 blur-[120px] rounded-full"></div>
    
      {/* Icon */}
      <div className="w-24 h-24 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gold-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M5 8h14l-1.5 11h-11L5 8zM9 8V6a3 3 0 016 0v2"
          />
        </svg>
      </div>
    
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4 text-black">
        Your Bag is Empty
      </h2>
    
      {/* Description */}
      <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
        Looks like you haven’t added anything yet. Discover our premium collection
        and find something you’ll love.
      </p>
    
      {/* Button */}
      <Link href="/product">
        <button className="group relative overflow-hidden bg-[#2FA084] text-white uppercase tracking-widest font-semibold py-4 px-10 rounded-2xl shadow-2xl transition-all duration-300">
    
          <span className="relative z-10">Browse Products</span>
    
          {/* hover glow */}
          <span className="absolute inset-0 bg-gold-500 opacity-0 group-hover:opacity-20 transition duration-300"></span>
    
        </button>
      </Link>
    
    </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 md:px-12 py-16">
      <h1 className="text-5xl md:text-6xl font-light text-center mb-16 tracking-widest">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-16">

        {/* FORM */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/50 backdrop-blur-md p-8  shadow-2xl space-y-8 border border-[#2FA084]"
        >

          <h2 className="text-2xl font-light border-b border-[#2FA084] pb-2">
            Shipping Details
          </h2>

          {[
            { name: "customerName", label: "Full Name *" },
            { name: "email", label: "Email *", type: "email" },
            { name: "phone", label: "Phone *" },
            { name: "addressLine1", label: "Address Line 1 *" },
            { name: "addressLine2", label: "Address Line 2" },
            { name: "city", label: "City *" },
            { name: "state", label: "State/Province *" },
            { name: "postalCode", label: "Postal Code *" },
            { name: "country", label: "Country *" },
            { name: "deliveryInstructions", label: "Delivery Instructions" },
          ].map((field) => (

            <div key={field.name} className="space-y-2">

            <label className="text-sm text-gray-400">
              {field.label}
            </label>
          
            {field.name === "deliveryInstructions" ? (
          
              <textarea
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                rows={3}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 outline-none transition
                ${errors[field.name] 
                  ? "border-red-500 focus:border-red-500" 
                  : "border-white/20 focus:border-gold-500"}
                `}
                placeholder={field.label}
              />
          
            ) : (
          
              <input
                type={field.type || "text"}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3 outline-none transition
                ${errors[field.name] 
                  ? "border-red-500 focus:border-red-500" 
                  : "border-white/20 focus:border-gold-500"}
                `}
                placeholder={field.label}
              />
          
            )}
          
            {errors[field.name] && (
              <p className="text-red-400 text-sm">
                {errors[field.name]}
              </p>
            )}
          
          </div>

          ))}

          {/* Payment */}

          <div className="mt-4">
            <h3 className="text-lg font-light mb-2">
              Payment Method
            </h3>

            <div className="flex items-center gap-2">
              <input type="radio" checked readOnly className="accent-[#2FA084]" />
              <span>Cash on Delivery</span>
            </div>
          </div>

        </motion.div>

        {/* ORDER SUMMARY */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-black/50 backdrop-blur-md p-8  shadow-2xl border border-[#2FA084] flex flex-col space-y-6"
        >

          <h2 className="text-2xl font-light border-b border-[#2FA084] pb-2">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[500px] overflow-y-auto">

            {items.map((item) => (

              <div key={item._id} className="flex gap-4 items-center">

                <div className="relative w-20 h-28 bg-gray-800 rounded-lg overflow-hidden border border-gold-500">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <p className="font-light text-lg">{item.title}</p>

                  <p className="text-gray-400 text-sm">
                    {item.quantity} × PKR {item.price.toFixed(2)}
                  </p>
                </div>

                <p className="font-semibold text-gold-500">
                  PKR {(item.price * item.quantity).toFixed(2)}
                </p>

              </div>

            ))}

          </div>

          <div className="border-t border-gold-500 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>PKR {total.toFixed(2)}</span>
          </div>

          <motion.button
            onClick={handleOrder}
            disabled={loading || success}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[#2FA084] text-white font-light text-lg rounded-2xl uppercase tracking-widest hover:brightness-110 transition"
          >
            {loading ? "Processing..." : success ? "Order Placed!" : "Place Order"}
          </motion.button>

        </motion.div>

      </div>

      {/* SUCCESS MODAL */}

      <AnimatePresence>
        {success && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-black/90 text-white p-12 rounded-3xl shadow-2xl text-center max-w-lg border border-gold-500"
            >

              <h2 className="text-3xl font-light font-semibold mb-4">
                Thank you!
              </h2>

              <p className="text-gray-400 mb-6">
                Your order has been successfully placed.
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-white text-black font-light rounded-lg hover:brightness-110 transition"
              >
                Close
              </button>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>

    </div>
  )
}