"use client"

import { useCartStore } from "@/app/store/CartStore"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CartDrawer() {
  const open = useCartStore((state) => state.isOpen)
  const openCart = useCartStore((state) => state.openCart)
  const closeCart = useCartStore((state) => state.closeCart)
  const router = useRouter()

  const items = useCartStore((state) => state.items)
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)
  const removeItem = useCartStore((state) => state.removeItem)
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  return (
    <>
      {/* NAVBAR BAG BUTTON */}
      <button
        onClick={openCart}
        className="relative text-white tracking-widest"
      >
        BAG
        {items.length > 0 && (
          <span className="absolute -top-2 -right-4 text-xs tracking-widest">
            ({items.length})
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeCart}
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-black text-white z-50 flex flex-col"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-10 py-8 border-b border-white/10">
                <h2 className="text-sm tracking-[0.3em] uppercase">
                  Your Bag
                </h2>
                <button onClick={closeCart}>
                  <X size={20} />
                </button>
              </div>

              {/* ITEMS */}
              <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
                {items.length === 0 && (
                  <p className="text-sm text-white/50 tracking-wide">
                    Your bag is empty.
                  </p>
                )}

                {items.map((item) => (
                  <div key={item._id} className="flex gap-6">
                    <div className="relative w-24 h-32 bg-neutral-900">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-sm tracking-wide uppercase">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/60 mt-1">
                          PKR {item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-6 text-sm tracking-widest">

                        <button
                          onClick={() => decreaseQty(item._id)}
                          className="hover:opacity-60 transition"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQty(item._id)}
                          className="hover:opacity-60 transition"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(item._id)}
                          className="ml-auto text-white/40 hover:text-white transition"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="px-10 py-8 border-t border-white/10 space-y-6">

                <div className="flex justify-between text-sm tracking-widest uppercase">
                  <span>Subtotal</span>
                  <span>PKR {totalPrice.toFixed(2)}</span>
                </div>

                <button
  onClick={() => {
    closeCart()  // your Zustand function
    router.push("/cart")
  }}
  className="w-full border border-white py-4 text-sm tracking-[0.3em] uppercase hover:bg-white hover:text-black transition duration-300"
>
  Checkout
</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}