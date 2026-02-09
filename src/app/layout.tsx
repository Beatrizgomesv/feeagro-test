import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/Header'
import AppLayout from '@/components/layout/AppLayout'
import { TransactionsProvider } from '@/contexts/TransactionsContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { UserProvider } from '@/contexts/UserContext'

export const metadata: Metadata = {
  title: 'RWA Banking',
  description: 'Mini dashboard de banking e RWA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-700 antialiased">
        <UserProvider>
        <ToastProvider>
          <TransactionsProvider>
            <Header />
            <AppLayout>
              {children}
            </AppLayout>
          </TransactionsProvider>
        </ToastProvider>
        </UserProvider>
      </body>
    </html>
  )
}
