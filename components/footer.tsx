import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#8E7DBE] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold mb-4">ZYRA</h2>
          <p className="text-sm text-white">
            Premium fashion for modern lifestyle.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-white">
            <Link href="/">Home</Link>
            <Link href="/product">Shop</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-white mb-4">
            Subscribe for latest updates.
          </p>
          <input
            placeholder="Enter your email"
            className="px-3 py-2 w-full rounded text-black"
          />
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-white">
        © 2026 ZYRA. All rights reserved.
      </div>
    </footer>
  )
}