"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import LuxuryLoader from "@/components/LuxuryLoader"

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 400) // keeps loader visible at least 0.4s for luxury feel

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {loading && <LuxuryLoader />}
      {children}
    </>
  )
}