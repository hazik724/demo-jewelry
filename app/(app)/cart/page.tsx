"use client"

import { useCartStore } from "@/app/store/CartStore"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import FeaturedProducts from "@/components/featuredProducts"
import PremiumTrustSection from "@/components/TrustSection"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)
  const removeItem = useCartStore((state) => state.removeItem)
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center">
        <h1 className="text-4xl font-light mb-6 tracking-wide">
          Your cart is empty
        </h1>
        <Link
          href="/product"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg tracking-widest uppercase hover:bg-white hover:text-black transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
      <h1 className="text-5xl font-light mb-16 tracking-tight text-center">
        Your Shopping Bag
      </h1>

      <div className="grid md:grid-cols-3 gap-12">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-8">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col md:flex-row gap-6 border-b pb-6 border-gray-200"
              >
                <div className="relative w-full md:w-32 h-48 bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-medium tracking-wide mb-2">
                      {item.title}
                    </h2>

                    <p className="text-[#2FA084] font-semibold text-lg mb-4">
                      PKR {item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                      >
                        −
                      </button>

                      <span className="text-lg">{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="ml-auto text-sm text-gray-500 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-lg font-semibold">
                    Total: PKR {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ORDER SUMMARY */}
        <div className="border border-gray-200 p-8 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-semibold mb-8 tracking-wide">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-lg">
            <span>Subtotal</span>
            <span>PKR {totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4 text-lg">
            <span>Shipping</span>
            <span className="text-[#2FA084] font-semibold">Free</span>
          </div>

          <div className="flex justify-between mb-8 text-xl font-bold border-t pt-4 border-gray-300">
            <span>Total</span>
            <span>PKR {totalPrice.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="block text-center bg-[#2FA084] text-white py-4 rounded-lg tracking-widest uppercase hover:bg-white hover:text-black transition duration-300"
          >
            Proceed to Checkout
          </Link>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Secure Checkout • COD 
          </p>
        </div>
        
      </div>
      <div>
        <PremiumTrustSection/>
      </div>
      <div>
        <FeaturedProducts/>
      
      </div>
    </div>
   
    
  )
}