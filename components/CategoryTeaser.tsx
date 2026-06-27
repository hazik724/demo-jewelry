import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 3600;

interface Category {
  title: string;
  slug: {
    current: string;
  };
  image: any;
}

async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
    title,
    slug,
    image
  }`;

  return client.fetch(query);
}

export default async function LuxuryCategoryHome() {
  const categories = await getCategories();

  return (
    <section className="pt-20 bg-white">
      {/* Header */}
      <div className="text-center mb-10 px-6">
        <p className="text-[10px] tracking-[0.6em] uppercase text-gray-400 mb-5">
          Explore
        </p>

        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black">
          Shop by Collection
        </h2>

        <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
          Discover timeless stainless steel jewellery designed with elegance and
          durability for everyday wear.
        </p>
      </div>

      {/* Categories */}
      <div className="px-2">
        <div className="flex gap-2 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {categories.map((category) => {
            const imageUrl = category.image
              ? urlFor(category.image)
                  .width(600)
                  .height(750)
                  .quality(70)
                  .auto("format")
                  .url()
              : "/placeholder.png";

            return (
              <div
                key={category.slug.current}
                className="min-w-[290px] sm:min-w-[360px] md:min-w-[430px] snap-start"
              >
                <Link
                  href={`/category/${category.slug.current}`}
                  className="group block"
                >
                  <div className="relative h-[400px] md:h-[520px] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl}
                      alt={category.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 80vw, 33vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition" />

                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#547792] group-hover:w-full transition-all duration-700" />
                  </div>

                  <div className="mt-5 text-left">
                    <h3 className="text-xl md:text-m tracking-[0.35em] uppercase font-light text-black group-hover:text-[#547792] transition">
                      {category.title}
                    </h3>

                    <p className="text-[11px] text-gray-400 mt-2">
                      Explore fine jewellery collection
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}