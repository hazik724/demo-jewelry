import Link from "next/link"
import { Instagram, Facebook, } from "lucide-react"

import { siTiktok } from "simple-icons"
function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      aria-hidden="true"
    >
      <path d={siTiktok.path} />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#2FA084] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-4">ZYRA</h2>
          <p className="text-sm text-white/90">
            Premium fashion for modern lifestyle.
          </p>

          {/* ✅ Social Badges (Hydration Safe) */}
          <div className="flex gap-3 mt-6">

            {/* Instagram */}
            <Link
              href="https://www.instagram.com/jhumkaarabyzyra?igsh=cGNvMDhnaHl3Y2pw"
              className="group flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 border border-white/20
              hover:bg-white hover:text-[#2FA084]
              transition-all duration-300 ease-out
              hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs tracking-wide">Instagram</span>
            </Link>

            {/* Facebook */}
            <Link
              href="https://www.facebook.com/share/1AzPKmxy7z/"
              className="group flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 border border-white/20
              hover:bg-white hover:text-[#2FA084]
              transition-all duration-300 ease-out
              hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Facebook className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xs tracking-wide">Facebook</span>
            </Link>

            {/* Twitter */}
            <Link
              href="https://www.tiktok.com/@jhumkaarabyzyra?_r=1&_t=ZS-95YoCncpvhB"
              className="group flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/10 border border-white/20
              hover:bg-white hover:text-[#2FA084]
              transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <TikTokIcon />
              <span className="text-xs tracking-wide">TikTok</span>
            </Link>

          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-white/90">
            <Link href="/">Home</Link>
            <Link href="/product">Shop</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-white/90 mb-4">
            Subscribe for latest updates.
          </p>
          <input
            placeholder="Enter your email"
            className="px-3 py-2 w-full rounded text-black"
          />
        </div>

      </div>

      <div className="border-t border-white/20 text-center py-4 text-sm text-white/80">
  © 2026 ZYRA. All rights reserved. A custom website designed & developed by Asavera.ltd for ZYRA.
</div>
    </footer>
  )
}