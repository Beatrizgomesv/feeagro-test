'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Transações', href: '/transactions', icon: '💸' },
  { label: 'Nova operação', href: '/new-operation', icon: '➕' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gray-100 border-r">
      <div className="p-5">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
            BG
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              Beatriz Gomes
            </p>
            <p className="text-xs text-gray-500">
              Conta pessoal
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                ${
                  active
                    ? 'bg-green-600 text-white font-medium'
                    : 'text-gray-700 hover:bg-white'
                }
              `}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 text-xs text-gray-400">
        © 2026 RWA Bank
      </div>
    </aside>
  )
}
