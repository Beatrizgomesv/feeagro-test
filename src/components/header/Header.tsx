'use client'

import { useState } from 'react'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="bg-green-700 text-white h-16 flex items-center justify-between px-6">
        <span className="font-semibold text-lg">
          🌱 RWA Bank
        </span>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
