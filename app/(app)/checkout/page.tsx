"use client"

import { useState } from "react"
import { useCartStore } from "@/app/store/CartStore"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import DeliveryText from "@/components/deliverytext"
import {
  SHIPPING_FEE,
  SHIPPING_SAVING,
  getPaymentBreakdown,
  type PaymentMethod,
} from "@/sanity/lib/shipping"

// ─── Design tokens ────────────────────────────────────────────────────────────
// Brand:    #2FA084  (Jhumkara teal)
// Ink:      #1a1f2e
// Muted:    #6b7280
// Surface:  #f8f9fb
// Border:   #e4e8ed
// Error:    #e05252
// ──────────────────────────────────────────────────────────────────────────────

const BRAND = "#2FA084"
const COD_FEE = SHIPPING_FEE.cod
const ADVANCE_FEE = SHIPPING_FEE.advance

const pkr = (n: number) => `PKR ${n.toLocaleString("en-PK")}`

const PAYMENT_ACCOUNTS = [
  {
    bank: "HBL Bank",
    tag: "Bank Transfer",
    title: "Hafiza Maliha",
    detailLabel: "IBAN",
    detail: "PK85HABB0004317000075303",
  },
  {
    bank: "Meezan Bank",
    tag: "Bank Transfer",
    title: "Hafiza Maliha Jamshaid",
    detailLabel: "IBAN",
    detail: "PK69MEZN0035010105676255",
  },
  {
    bank: "JazzCash",
    tag: "Mobile Wallet",
    title: "Hafiza Maliha Jamshaid",
    detailLabel: "Number",
    detail: "0303 7830023",
  },
]

type FormKey =
  | "customerName"
  | "email"
  | "phone"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "state"
  | "country"
  | "deliveryInstructions"

const FIELDS: {
  name: FormKey
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  inputMode?: "tel" | "email" | "text"
  fullWidth?: boolean
}[] = [
  { name: "customerName", label: "Full Name", required: true, autoComplete: "name" },
  { name: "email", label: "Email Address", type: "email", required: true, autoComplete: "email", inputMode: "email" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, autoComplete: "tel", inputMode: "tel" },
  { name: "addressLine1", label: "Address Line 1", required: true, autoComplete: "address-line1", fullWidth: true },
  { name: "addressLine2", label: "Address Line 2 (optional)", autoComplete: "address-line2", fullWidth: true },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "state", label: "State / Province", required: true, autoComplete: "address-level1" },
  { name: "country", label: "Country", required: true, autoComplete: "country-name" },
  { name: "deliveryInstructions", label: "Delivery Instructions (optional)", fullWidth: true },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({})
  const [submitError, setSubmitError] = useState("")
  const { items, clearCart } = useCartStore()

  const [form, setForm] = useState<Record<FormKey, string>>({
    customerName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "Pakistan",
    deliveryInstructions: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  // Remember the amounts at the moment of ordering (the cart is cleared after)
  const [receipt, setReceipt] = useState<{
    method: PaymentMethod
    payNow: number
    dueOnDelivery: number
  } | null>(null)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const {
    shippingFee,
    total: finalTotal,
    payNow,
    dueOnDelivery,
  } = getPaymentBreakdown(total, paymentMethod)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FormKey
    setForm((f) => ({ ...f, [name]: e.target.value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const e: Partial<Record<FormKey, string>> = {}

    if (!form.customerName.trim()) e.customerName = "Full name is required"

    if (!form.email.trim()) e.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      e.email = "Enter a valid email address"

    if (!form.phone.trim()) e.phone = "Phone number is required"
    else if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a valid phone number"

    if (!form.addressLine1.trim()) e.addressLine1 = "Address is required"
    if (!form.city.trim()) e.city = "City is required"
    if (!form.state.trim()) e.state = "State is required"
    if (!form.country.trim()) e.country = "Country is required"

    return e
  }

  const handleOrder = async () => {
    setSubmitError("")

    const newErrors = validate()
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
          country: form.country,
          deliveryInstructions: form.deliveryInstructions,

          userId: null,

          paymentMethod, // "cod" | "advance"

          products: items.map((item) => ({
            _id: item._id, // lets the server verify the real price
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),

          shippingFee,
          totalAmount: finalTotal,
        }),
      })

      const json = await res.json()

      if (json.success) {
        setReceipt({ method: paymentMethod, payNow, dueOnDelivery })
        clearCart()
        setSuccess(true)
      } else {
        setSubmitError(
          json.error ||
            "We couldn't place your order. Please check your details and try again."
        )
      }
    } catch (err) {
      console.error(err)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  // ── Empty cart ───────────────────────────────────────────────────────────────
  if (items.length === 0 && !success)
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#e4e8ed] bg-[#f8f9fb]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke={BRAND}
            strokeWidth={1.4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 8h14l-1.5 11h-11L5 8zM9 8V6a3 3 0 016 0v2"
            />
          </svg>
        </div>

        <h2 className="mb-4 text-3xl font-light tracking-tight text-[#1a1f2e] md:text-4xl">
          Your bag is empty
        </h2>

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

  // ── Styles ───────────────────────────────────────────────────────────────────
  const inputClass = (hasError: boolean) =>
    `w-full border bg-white px-3.5 py-3 text-[0.9rem] text-[#1a1f2e] outline-none transition-colors focus:border-[#2FA084] ${
      hasError ? "border-[#e05252]" : "border-[#e4e8ed]"
    }`

  const stepBadge =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2FA084] text-xs font-semibold text-white"

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f9fb] text-[#1a1f2e]">
      {/* ── Page header ── */}
      <div className="border-b border-[#e4e8ed] bg-white px-4 py-14 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#2FA084]">
          Secure Checkout
        </p>
        <h1 className="text-4xl font-light tracking-tight text-[#1a1f2e] md:text-5xl">
          Complete Your Order
        </h1>
      </div>

      {/* ── Trust bar ── */}
      <div className="flex flex-wrap justify-center gap-6 bg-[#2FA084] px-4 py-4 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white/90 md:gap-12">
        {["SSL Secured", "Cash on Delivery", "Fast Delivery"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-[1fr_400px] md:px-8">
        {/* ── LEFT: Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-w-0"
        >
          {/* Shipping details */}
          <div className="mb-6 border border-[#e4e8ed] bg-white p-5 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <span className={stepBadge}>1</span>
              <h2 className="text-lg font-normal tracking-[0.04em]">
                Shipping Details
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {FIELDS.map((field) => {
                const error = errors[field.name]
                const id = `checkout-${field.name}`

                return (
                  <div
                    key={field.name}
                    className={field.fullWidth ? "md:col-span-2" : ""}
                  >
                    <label
                      htmlFor={id}
                      className="mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-[#6b7280]"
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-[#2FA084]">*</span>
                      )}
                    </label>

                    {field.name === "deliveryInstructions" ? (
                      <textarea
                        id={id}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        rows={3}
                        className={inputClass(!!error)}
                      />
                    ) : (
                      <input
                        id={id}
                        type={field.type || "text"}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        autoComplete={field.autoComplete}
                        inputMode={field.inputMode}
                        aria-invalid={!!error}
                        className={inputClass(!!error)}
                      />
                    )}

                    {error && (
                      <p className="mt-1.5 text-xs text-[#e05252]">{error}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment method */}
          <div className="border border-[#e4e8ed] bg-white p-5 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <span className={stepBadge}>2</span>
              <h2 className="text-lg font-normal tracking-[0.04em]">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              {/* COD */}
              <label
                className={`flex cursor-pointer items-center justify-between gap-3 border-[1.5px] px-5 py-4 transition-all duration-200 ${
                  paymentMethod === "cod"
                    ? "border-[#2FA084] bg-[#2FA084]/5"
                    : "border-[#e4e8ed] bg-white"
                }`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 shrink-0 accent-[#2FA084]"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.9rem] font-medium">Cash on Delivery</p>
                    <p className="mt-0.5 text-[0.78rem] text-[#6b7280]">
                      Pay nothing now. Pay everything when your order arrives.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-sm font-semibold">{pkr(COD_FEE)}</span>
                  <p className="text-[0.7rem] text-[#6b7280]">shipping</p>
                </div>
              </label>

              {/* Advance */}
              <label
                className={`flex cursor-pointer items-center justify-between gap-3 border-[1.5px] px-5 py-4 transition-all duration-200 ${
                  paymentMethod === "advance"
                    ? "border-[#2FA084] bg-[#2FA084]/5"
                    : "border-[#e4e8ed] bg-white"
                }`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "advance"}
                    onChange={() => setPaymentMethod("advance")}
                    className="h-4 w-4 shrink-0 accent-[#2FA084]"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.9rem] font-medium">Advance Payment</p>
                    <p className="mt-0.5 text-[0.78rem] text-[#6b7280]">
                      Pay product price now · shipping on delivery
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-sm font-semibold text-[#1f7a63]">
                    {pkr(ADVANCE_FEE)}
                  </span>
                  <p className="text-[0.7rem] text-[#1f7a63]">
                    shipping · Save {pkr(SHIPPING_SAVING)}
                  </p>
                </div>
              </label>
            </div>

            {/* Shipping discount note */}
            <div className="mt-4 flex items-center gap-3 border-l-[3px] border-[#2FA084] bg-[#2FA084]/5 px-4 py-3 text-sm text-[#1f7a63]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              <span>
                Pay the product price in advance and shipping drops to{" "}
                {pkr(ADVANCE_FEE)}, paid when your parcel arrives.
              </span>
            </div>

            {/* Advance payment details */}
            {paymentMethod === "advance" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border border-[#e4e8ed]"
              >
                {/* Header */}
                <div className="flex items-center gap-3 bg-[#2FA084] px-4 py-5 text-white md:px-6">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-[0.9rem] font-medium">
                      Advance Payment Details
                    </p>
                    <p className="mt-px text-xs opacity-80">
                      Transfer {pkr(payNow)} to any of the accounts below
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-4 md:p-6">
                  {/* Amount to transfer */}
                  <div className="border-l-[3px] border-[#2FA084] bg-[#2FA084]/5 px-4 py-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#6b7280]">Transfer now (product price)</span>
                      <span className="font-semibold text-[#1f7a63]">
                        {pkr(payNow)}
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between gap-3">
                      <span className="text-[#6b7280]">
                        Pay on delivery (shipping)
                      </span>
                      <span className="font-medium">{pkr(dueOnDelivery)}</span>
                    </div>
                  </div>

                  {PAYMENT_ACCOUNTS.map((acc) => (
                    <div
                      key={acc.bank}
                      className="border border-[#e4e8ed] p-4 md:p-5"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-[0.9rem] font-semibold">{acc.bank}</p>
                        <span className="shrink-0 bg-[#2FA084]/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#1f7a63]">
                          {acc.tag}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-2">
                          <span className="text-[#6b7280]">Account Title</span>
                          <span className="text-right font-medium">
                            {acc.title}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-4">
                          <span className="shrink-0 text-[#6b7280]">
                            {acc.detailLabel}
                          </span>
                          <span className="min-w-0 break-all text-right font-mono text-[0.82rem] font-medium">
                            {acc.detail}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* WhatsApp confirmation */}
                  <div className="border-l-[3px] border-[#2FA084] bg-[#2FA084]/5 px-4 py-3 text-left text-sm">
                    After payment, send your screenshot on{" "}
                    <span className="font-semibold text-[#1f7a63]">
                      WhatsApp 03083366699
                    </span>{" "}
                    to confirm your order.
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── RIGHT: Order summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex min-w-0 flex-col"
        >
          <div className="static border border-[#e4e8ed] bg-white md:sticky md:top-6">
            {/* Summary header */}
            <div className="border-b border-[#e4e8ed] px-6 py-5">
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#2FA084]">
                Your Order
              </p>
              <p className="text-[1.15rem] font-light">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Items list */}
            <div className="max-h-80 space-y-4 overflow-y-auto border-b border-[#e4e8ed] px-6 py-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-[#e4e8ed] bg-[#f8f9fb]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.87rem]">{item.title}</p>
                    <p className="mt-0.5 text-[0.78rem] text-[#6b7280]">
                      Qty {item.quantity} × {pkr(item.price)}
                    </p>
                  </div>
                  <p className="shrink-0 text-[0.87rem] font-semibold">
                    {pkr(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 px-6 py-5">
              <div className="flex justify-between text-sm text-[#6b7280]">
                <span>Subtotal</span>
                <span className="text-[#1a1f2e]">{pkr(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#6b7280]">
                <span>Shipping</span>
                <span className="font-medium text-[#1a1f2e]">
                  {pkr(shippingFee)}
                </span>
              </div>
              <div className="mt-1 flex justify-between border-t border-[#e4e8ed] pt-4 text-[1.05rem] font-semibold">
                <span>Total</span>
                <span>{pkr(finalTotal)}</span>
              </div>

              {/* When you pay */}
              <div className="space-y-2 border-l-[3px] border-[#2FA084] bg-[#2FA084]/5 px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Pay now</span>
                  <span className="font-semibold text-[#1f7a63]">
                    {pkr(payNow)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b7280]">Pay on delivery</span>
                  <span className="font-semibold">{pkr(dueOnDelivery)}</span>
                </div>
              </div>

              <div className="pt-2 text-sm text-[#6b7280]">
                <DeliveryText />
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              {submitError && (
                <p
                  role="alert"
                  className="mb-3 border-l-[3px] border-[#e05252] bg-[#e05252]/5 px-3 py-2 text-sm text-[#e05252]"
                >
                  {submitError}
                </p>
              )}

              <motion.button
                onClick={handleOrder}
                disabled={loading || success}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-[#2FA084] py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing…
                  </span>
                ) : success ? (
                  "✓ Order Placed"
                ) : (
                  "Place Order"
                )}
              </motion.button>

              {/* Security note */}
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
                <span>SSL encrypted · Your data is safe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Success modal ── */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1f2e]/75 px-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              className="w-full max-w-md border border-[#e4e8ed] bg-white px-10 py-12 text-center"
            >
              {/* Checkmark */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2FA084]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#2FA084]">
                Order Confirmed
              </p>

              <h2
                id="order-success-title"
                className="mb-3 text-2xl font-light tracking-tight md:text-3xl"
              >
                Thank you!
              </h2>

              <p className="mb-8 text-[0.9rem] leading-relaxed text-[#6b7280]">
                {receipt?.method === "advance" ? (
                  <>
                    Please transfer{" "}
                    <strong className="text-[#1a1f2e]">
                      {pkr(receipt.payNow)}
                    </strong>{" "}
                    (product price) and send the screenshot on WhatsApp
                    03083366699. Pay{" "}
                    <strong className="text-[#1a1f2e]">
                      {pkr(receipt.dueOnDelivery)}
                    </strong>{" "}
                    shipping to the rider when your parcel arrives.
                  </>
                ) : (
                  <>
                    Your order has been placed. Please keep{" "}
                    <strong className="text-[#1a1f2e]">
                      {pkr(receipt?.dueOnDelivery ?? 0)}
                    </strong>{" "}
                    ready to pay when your parcel arrives.
                  </>
                )}
              </p>

              <Link
                href="/product"
                onClick={() => setSuccess(false)}
                className="block w-full bg-[#2FA084] py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:brightness-110"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}