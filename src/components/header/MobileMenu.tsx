'use client'

import Link from 'next/link'

type Props = {
  open: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Transações', href: '/transactions' },
  { label: 'Nova Operação', href: '/new-operation' },
]

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="md:hidden bg-green-700 border-t border-green-600">
      <nav className="flex flex-col px-4 py-3 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-green-100 py-2"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
