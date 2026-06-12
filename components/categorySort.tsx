"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function LuxurySort() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get("sort") || ""

  const handleChange = (value: string) => {
    router.push(`?sort=${value}`)
  }

  return (
    <div className="flex justify-end mb-12">
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-transparent border-b border-black px-2 py-1 focus:outline-none"
      >
        <option value="">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  )
}