"use client"

import { MessageCircle } from "lucide-react"

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
  const phoneNumber = "923083366699"

  const message = `
Hi I want to coustomize this product:

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
    className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg transition-all"
  >
    <MessageCircle size={22} />
  
    <span className="text-sm font-medium tracking-wide">
      For customization click here
    </span>
  </a>
  )
}