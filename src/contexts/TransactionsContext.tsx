'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Transaction } from '@/mocks/transaction'

type TransactionsContextType = {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined)

const STORAGE_KEY = 'rwa-transactions'

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    )
  }, [transactions])

  function addTransaction(transaction: Transaction) {
    setTransactions((prev) =>
      [transaction, ...prev].sort(
        (a, b) => b.date.localeCompare(a.date)
      )
    )
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error(
      'useTransactions must be used within TransactionsProvider'
    )
  }
  return context
}
