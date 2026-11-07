"use client"

import { useCartStore } from "@/app/store/CartStore"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import PremiumTrustSection from "@/components/TrustSection"
import {
  SHIPPING_FEE,
  SHIPPING_SAVING,
  getPaymentBreakdown,
} from "@/sanity/lib/shipping"

const pkr = (n: number) => `PKR ${n.toLocaleString("en-PK")}`

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)
  const removeItem = useCartStore((state) => state.removeItem)
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  // ── Empty cart ───────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#e4e8ed] bg-[#f8f9fb]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2FA084"
            strokeWidth={1.4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 8h14l-1.5 11h-11L5 8zM9 8V6a3 3 0 016 0v2"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-light tracking-tight text-[#1a1f2e] md:text-4xl">
          Your bag is empty
        </h1>

        <p className="mb-10 max-w-sm text-[0.95rem] leading-relaxed text-[#6b7280]">
          Discover our jewelry collection and find something you&apos;ll love.
        </p>

        <Link
          href="/product"
          className="bg-[#2FA084] px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:brightness-110"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const itemCount = items.reduce((n, i) => n + i.quantity, 0)
  const cod = getPaymentBreakdown(totalPrice, "cod")
  const advance = getPaymentBreakdown(totalPrice, "advance")

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f9fb] text-[#1a1f2e]">
      {/* ── Page header ── */}
      <div className="border-b border-[#e4e8ed] bg-white px-4 py-14 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#2FA084]">
          Your Bag
        </p>
        <h1 className="text-4xl font-light tracking-tight md:text-5xl">
          Shopping Bag
        </h1>
        <p className="mt-4 text-sm tracking-wide text-[#6b7280]">
          Carefully curated pieces waiting for you
        </p>
      </div>

      {/* ── Trust bar ── */}
      <div className="flex flex-wrap justify-center gap-6 bg-[#2FA084] px-4 py-4 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white/90 md:gap-12">
        {["Secure Checkout", "Cash on Delivery", "Advance Payment Discount"].map(
          (t) => (
            <span key={t}>{t}</span>
          )
        )}
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-[1fr_400px] md:px-8">
        {/* ── LEFT: Items ── */}
        <div className="min-w-0 space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 border border-[#e4e8ed] bg-white p-4 md:gap-6 md:p-6"
              >
                {/* IMAGE */}
                <div className="relative h-32 w-24 shrink-0 overflow-hidden border border-[#e4e8ed] bg-[#f8f9fb] md:h-36 md:w-28">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="line-clamp-2 text-base font-normal tracking-wide md:text-lg">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-sm text-[#6b7280]">
                        {pkr(item.price)} each
                      </p>
                    </div>

                    <p className="shrink-0 text-base font-semibold">
                      {pkr(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center border border-[#e4e8ed]">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="h-9 w-9 text-lg text-[#1a1f2e] transition hover:bg-[#f8f9fb]"
                      >
                        −
                      </button>

                      <span
                        className="w-10 text-center text-sm"
                        aria-live="polite"
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        aria-label={`Increase quantity of ${item.title}`}
                        className="h-9 w-9 text-lg text-[#1a1f2e] transition hover:bg-[#f8f9fb]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      aria-label={`Remove ${item.title} from bag`}
                      className="text-xs font-medium uppercase tracking-[0.15em] text-[#6b7280] transition hover:text-[#e05252]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link
            href="/product"
            className="inline-block pt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#6b7280] underline underline-offset-4 transition hover:text-[#1a1f2e]"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* ── RIGHT: Summary ── */}
        <div className="min-w-0">
          <div className="static border border-[#e4e8ed] bg-white md:sticky md:top-6">
            {/* Summary header */}
            <div className="border-b border-[#e4e8ed] px-6 py-5">
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#2FA084]">
                Order Summary
              </p>
              <p className="text-[1.15rem] font-light">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Totals */}
            <div className="space-y-3 px-6 py-5">
              <div className="flex justify-between text-sm text-[#6b7280]">
                <span>Subtotal</span>
                <span className="font-medium text-[#1a1f2e]">
                  {pkr(totalPrice)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#6b7280]">
                <span>Shipping</span>
                <span className="text-[#1a1f2e]">Calculated at checkout</span>
              </div>

              {/* Shipping options */}
              <div className="space-y-3 border-l-[3px] border-[#2FA084] bg-[#2FA084]/5 px-4 py-3 text-sm">
                <div>
                  <div className="flex justify-between font-medium text-[#1a1f2e]">
                    <span>Cash on Delivery</span>
                    <span>Total {pkr(cod.total)}</span>
                  </div>
                  <p className="text-xs text-[#6b7280]">
                    Pay nothing now. Pay {pkr(cod.dueOnDelivery)} on delivery
                    (includes {pkr(SHIPPING_FEE.cod)} shipping).
                  </p>
                </div>

                <div className="border-t border-[#2FA084]/20 pt-3">
                  <div className="flex justify-between font-semibold text-[#1f7a63]">
                    <span>Advance Payment</span>
                    <span>Total {pkr(advance.total)}</span>
                  </div>
                  <p className="text-xs text-[#6b7280]">
                    Pay {pkr(advance.payNow)} now (product price). Pay only{" "}
                    {pkr(advance.dueOnDelivery)} shipping on delivery.
                  </p>
                  <p className="pt-1 text-xs font-medium text-[#1f7a63]">
                    Save {pkr(SHIPPING_SAVING)} on shipping.
                  </p>
                </div>
              </div>

              <p className="border-t border-[#e4e8ed] pt-4 text-xs text-[#6b7280]">
                Your final total, including shipping, is shown at checkout.
              </p>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <Link
                href="/checkout"
                className="block w-full bg-[#2FA084] py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:brightness-110"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6b7280]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>Secure Checkout · COD &amp; Advance Payment</span>
              </div>

              <p className="mt-3 text-center text-xs text-[#6b7280]">
                Custom jewelry delivery takes 8-10 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Extra sections ── */}
      <div className="mt-8">
        <PremiumTrustSection />
      </div>
    </div>
  )
}