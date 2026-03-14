import CategorySort from "@/components/categorySort"
import { client } from "@/sanity/lib/client"
import CategoryProductCard from "@/components/ProductCard"

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string }>
}) {
  const { slug } = await params
  const { sort } = await searchParams

  let order = "_createdAt desc"
  if (sort === "price-low") order = "price asc"
  if (sort === "price-high") order = "price desc"

  const query = `*[_type == "product" && $slug in categories[]->slug.current] | order(${order}){
    _id,
    title,
    slug,
    images,
    price,
    discountPrice
  }`

  const products = await client.fetch(query, { slug })

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
        <h1 className="text-4xl font-light capitalize tracking-tight">{slug}</h1>
        <CategorySort />
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <CategoryProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <h2 className="text-2xl font-semibold mb-4">No products found</h2>
          <p className="text-gray-500">This category doesn’t have any products yet.</p>
        </div>
      )}
    </div>
  )
}