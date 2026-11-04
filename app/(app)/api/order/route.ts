import { NextRequest, NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// Keep these in sync with COD_FEE / ONLINE_FEE in the checkout page.
const SHIPPING_FEE = { cod: 400, online: 250 } as const
type PaymentMethod = keyof typeof SHIPPING_FEE

const MAX_LINE_ITEMS = 30
const MAX_QTY_PER_ITEM = 50

// Always read prices fresh from Sanity (never from the CDN cache)
const freshClient = client.withConfig({ useCdn: false })

const clean = (v: unknown, max = 300) =>
  typeof v === "string" ? v.trim().slice(0, max) : ""

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    /* ---------------- VALIDATE CUSTOMER DETAILS ---------------- */
    const customerName = clean(body.customerName, 100)
    const email = clean(body.email, 150)
    const phone = clean(body.phone, 30)
    const addressLine1 = clean(body.addressLine1, 200)
    const addressLine2 = clean(body.addressLine2, 200)
    const city = clean(body.city, 100)
    const state = clean(body.state, 100)
    const country = clean(body.country, 100)
    const deliveryInstructions = clean(body.deliveryInstructions, 500)

    if (!customerName || !addressLine1 || !city || !state || !country) {
      return fail("Please fill in all required shipping details.")
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return fail("Please enter a valid email address.")
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return fail("Please enter a valid phone number.")
    }

    const paymentMethod: PaymentMethod =
      body.paymentMethod === "online" ? "online" : "cod"

    /* ---------------- VALIDATE CART LINES ---------------- */
    const lines: { _id: string; quantity: number }[] = Array.isArray(
      body.products
    )
      ? body.products.map((p: any) => ({
          _id: typeof p?._id === "string" ? p._id : "",
          quantity: Number(p?.quantity),
        }))
      : []

    if (
      lines.length === 0 ||
      lines.length > MAX_LINE_ITEMS ||
      lines.some(
        (l) =>
          !l._id ||
          !Number.isInteger(l.quantity) ||
          l.quantity < 1 ||
          l.quantity > MAX_QTY_PER_ITEM
      )
    ) {
      return fail("Your cart looks invalid. Please refresh and try again.")
    }

    /* ---------------- LOOK UP REAL PRICES IN SANITY ---------------- */
    const ids = Array.from(new Set(lines.map((l) => l._id)))

    const dbProducts: {
      _id: string
      title: string
      price: number
      image?: any
    }[] = await freshClient.fetch(
      `*[_type == "product" && _id in $ids]{
        _id,
        title,
        price,
        "image": images[0]
      }`,
      { ids }
    )

    const byId = new Map(dbProducts.map((p) => [p._id, p]))

    if (lines.some((l) => !byId.has(l._id))) {
      return fail(
        "Some items in your cart are no longer available. Please remove them and try again.",
        409
      )
    }

    const items = lines.map((l) => {
      const p = byId.get(l._id)!
      return {
        _key: crypto.randomUUID(), // REQUIRED by Sanity
        productId: p._id,
        title: p.title,
        price: p.price, // real price from Sanity
        quantity: l.quantity,
        image: p.image ? urlFor(p.image).width(200).url() : undefined,
      }
    })

    if (items.some((i) => typeof i.price !== "number" || i.price < 0)) {
      return fail("One of the products has no valid price.", 409)
    }

    /* ---------------- SERVER-SIDE TOTALS ---------------- */
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shippingFee = SHIPPING_FEE[paymentMethod]
    const totalAmount = subtotal + shippingFee

    // If the customer saw a different total, their cart has stale prices.
    // Stop here so nobody is charged a different amount than they saw.
    if (Math.abs(Number(body.totalAmount) - totalAmount) > 0.5) {
      return fail(
        "Some prices in your cart have changed. Please remove the items and add them again.",
        409
      )
    }

    /* ---------------- SAVE ORDER ---------------- */
    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 5)
      .toUpperCase()}`

    await client.create({
      _type: "order",

      orderId,

      customerName,
      email,
      phone,

      shippingAddress: {
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        deliveryInstructions,
      },

      items,

      shippingFee,
      totalAmount,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    })

    // Only return what the browser needs (not the whole Sanity document)
    return NextResponse.json({ success: true, orderId })
  } catch (err) {
    console.error("Sanity order creation error:", err)
    return fail("Something went wrong while placing your order.", 500)
  }
}