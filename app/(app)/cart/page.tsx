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

const shippingFee = 300
const finalTotal = totalPrice + shippingFee
return (
  <div className="bg-[#f7f7f5] min-h-screen">

    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">
          Your Shopping Bag
        </h1>
        <p className="text-gray-500 mt-4 tracking-wide text-sm">
          Carefully curated pieces waiting for you
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-14">

        {/* LEFT: ITEMS */}
        <div className="md:col-span-2 space-y-8">

          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-6 bg-white  p-6 shadow-sm hover:shadow-md transition"
              >

                {/* IMAGE */}
                <div className="relative w-28 h-36 md:w-32 md:h-40 overflow-hidden  bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition duration-700"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h2 className="text-xl md:text-2xl font-light tracking-wide">
                      {item.title}
                    </h2>

                    <p className="text-[#2FA084] font-medium mt-2">
                      PKR {item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between mt-6">

                    <div className="flex items-center gap-4">

                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                      >
                        −
                      </button>

                      <span className="text-sm tracking-widest">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-9 h-9 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-xs tracking-widest uppercase text-gray-400 hover:text-red-500 transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>

        {/* RIGHT: SUMMARY */}
        <div className="sticky top-24">

          <div className="bg-white  p-8 shadow-sm">

            <h2 className="text-xl font-light tracking-wide mb-8">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm text-gray-600">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#2FA084] font-medium">
                  PKR {shippingFee}
                </span>
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between text-base font-medium text-black">
                <span>Total</span>
                <span>PKR {finalTotal.toFixed(2)}</span>
              </div>

            </div>

            <Link
              href="/checkout"
              className="block mt-10 text-center bg-[#2FA084] text-white py-4  tracking-widest uppercase hover:opacity-90 transition"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Secure Checkout • COD Available
            </p>
            <p className="text-xs text-gray-400 mt-4 text-center">
              For Custom jewelry Delivery take 8-10 days
            </p>
          </div>

        </div>

      </div>

      {/* EXTRA SECTIONS */}
      <div className="mt-24 space-y-20">
        <PremiumTrustSection />
        <FeaturedProducts />
      </div>

    </div>
  </div>
)
}