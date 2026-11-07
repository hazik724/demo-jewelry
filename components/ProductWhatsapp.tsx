"use client"

import { MessageCircle } from "lucide-react"
import { useCartStore } from "@/app/store/CartStore"

interface Props {
  productName: string
  productUrl?: string
  price?: number
}

export default function WhatsAppProductButton({
  productName,
  productUrl,
  price,
}: Props) {
  // Hide the floating button while the cart drawer is open
  const cartOpen = useCartStore((state) => state.isOpen)

  if (cartOpen) return null

  const phoneNumber = "923083366699"

  const message = `
Hi I want to customize this product:

Product: ${productName}
Price: ${price ? `PKR ${price}` : "Not specified"}
Link: ${productUrl || "N/A"}
`

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#2FA084] hover:brightness-110 text-white px-3 py-3 rounded-full shadow-lg transition-all"
    >
      <MessageCircle size={15} />

      <span className="text-sm font-medium tracking-wide">
        Customize This Jewelry
      </span>
    </a>
  )
}