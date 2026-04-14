"use client"

import { useCartStore } from "@/app/store/CartStore"

interface Props {
  id: string
  title: string
  price: number
  image: string
  slug: string
}

export default function CartButton({
  id,
  title,
  price,
  image,
  slug,
}: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const openCart = useCartStore((state) => state.openCart)

  const handleAdd = () => {
    addItem({
      _id: id,
      title,
      slug,
      image,
      price,
      quantity: 1,
    })

    openCart()
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full border border-black py-4 tracking-widest uppercase text-sm hover:bg-[#2FA084] hover:text-white transition duration-500"
    >
      Add to Bag
    </button>
  )
}