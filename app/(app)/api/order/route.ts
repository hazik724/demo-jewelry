import { NextRequest, NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const orderId = `ORD-${Date.now()}`

    const order = await client.create({
      _type: "order",

      orderId,

      customerName: body.customerName,
      email: body.email,
      phone: body.phone,

      shippingAddress: {
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country,
        deliveryInstructions: body.deliveryInstructions,
      },

      items: body.products.map((item: any) => ({
        _key: crypto.randomUUID(), // REQUIRED by Sanity
      
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),

      totalAmount: body.totalAmount,
      paymentMethod: "cod",
      status: "pending",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, order })
  } catch (err: any) {
    console.error("Sanity order creation error:", err)
    return NextResponse.json(
      { success: false, error: err.message || "Error creating order" },
      { status: 500 }
    )
  }
}