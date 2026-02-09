'use client'

import { createContext, useContext, useState } from 'react'

type Toast = {
  id: string
  message: string
}

type ToastContextType = {
  showToast: (message: string) => void
}

const ToastContext = createContext<
  ToastContextType | undefined
>(undefined)

export function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toasts, setToasts] = useState<Toast[]>([])

  function showToast(message: string) {
    const id = crypto.randomUUID()

    setToasts((prev) => [...prev, { id, message }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-green-600 text-white px-4 py-2 rounded shadow"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error(
      'useToast must be used within ToastProvider'
    )
  }
  return context
}
