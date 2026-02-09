'use client'

import { useState } from 'react'
import { useTransactions } from '@/contexts/TransactionsContext'
import TransactionList from '@/components/transactions/TransactionList'

type Filter = 'ALL' | 'IN' | 'OUT'

export default function TransactionsPage() {
  const { transactions } = useTransactions()
  const [filter, setFilter] = useState<Filter>('ALL')

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'ALL') return true
    return t.type === filter
  })

  return (
    <section className="px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Transações
        </h1>
        <p className="text-sm text-gray-500">
          Histórico de movimentações financeiras
        </p>
      </div>

      <div className="flex gap-2">
        <FilterButton
          active={filter === 'ALL'}
          onClick={() => setFilter('ALL')}
        >
          Todas
        </FilterButton>

        <FilterButton
          active={filter === 'IN'}
          onClick={() => setFilter('IN')}
        >
          Entradas
        </FilterButton>

        <FilterButton
          active={filter === 'OUT'}
          onClick={() => setFilter('OUT')}
        >
          Saídas
        </FilterButton>
      </div>

      <TransactionList transactions={filteredTransactions} />
    </section>
  )
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          active
            ? 'bg-green-600 text-white'
            : 'bg-white border text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      {children}
    </button>
  )
}
