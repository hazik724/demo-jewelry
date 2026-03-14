"use client"

export default function FilterSidebar() {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4 sticky top-20">
      <h3 className="font-semibold text-lg">Filters</h3>

      <div>
        <h4 className="font-medium text-sm mb-1">Price Range</h4>
        <input
          type="range"
          min={0}
          max={500}
          className="w-full"
        />
      </div>

      <div>
        <h4 className="font-medium text-sm mb-1">Categories</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>
            <input type="checkbox" /> T-Shirts
          </li>
          <li>
            <input type="checkbox" /> Jeans
          </li>
          <li>
            <input type="checkbox" /> Jackets
          </li>
        </ul>
      </div>
    </div>
  )
}