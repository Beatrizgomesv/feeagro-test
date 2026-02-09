'use client'

import { createContext, useContext } from 'react'

type User = {
  name: string
  accountType: 'PERSONAL' | 'BUSINESS'
  kycStatus: 'VERIFIED' | 'PENDING'
  initialBalance: number
}

const userMock: User = {
  name: 'Beatriz Gomes',
  accountType: 'PERSONAL',
  kycStatus: 'VERIFIED',
  initialBalance: 25000,
}

const UserContext = createContext<User | null>(null)

export function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserContext.Provider value={userMock}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(
      'useUser must be used within UserProvider'
    )
  }
  return context
}
