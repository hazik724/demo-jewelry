"use client"

import { useState } from "react"

interface FiltersProps {
  applyFilters: (filters: FiltersState) => void
}

export interface FiltersState {
  minPrice: number
  maxPrice: number
  colors: string[]
  sizes: string[]
  onSale: boolean
}

export default function ProductFilters({ applyFilters }: FiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    minPrice: 0,
    maxPrice: 1000,
    colors: [],
    sizes: [],
    onSale: false,
  })

  const availableColors = ["Black", "White", "Red", "Blue", "Beige"]
  const availableSizes = ["S", "M", "L", "XL"]

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const toggleColor = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }))
  }

  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl space-y-6 sticky top-6 h-fit">
      <h3 className="font-semibold text-lg mb-2">Filters</h3>

      {/* Price */}
      <div>
        <label className="block mb-1 text-gray-600 dark:text-gray-300">Price</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="text-gray-600 dark:text-gray-300 mb-2">Color</h4>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border transition-all duration-300 hover:ring-2 hover:ring-red-600 ${
                filters.colors.includes(color) ? "ring-2 ring-red-600" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => toggleColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="text-gray-600 dark:text-gray-300 mb-2">Size</h4>
        <div className="flex gap-2 flex-wrap">
          {availableSizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded text-sm font-medium transition-colors duration-300 ${
                filters.sizes.includes(size)
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => toggleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* On Sale */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.onSale}
          onChange={() => setFilters({ ...filters, onSale: !filters.onSale })}
          className="accent-red-600"
        />
        <label className="text-gray-700 dark:text-gray-300">On Sale</label>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => applyFilters(filters)}
        className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300"
      >
        Apply Filters
      </button>
    </aside>
  )
}