'use client'

import OperationForm from "@/components/operations/OperationForm"



export default function NewOperationPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">


      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Nova Operação</h1>
        <p className="text-sm text-gray-500">
          Simule uma transferência ou investimento
        </p>
      </header>

      <OperationForm />
    </section>
  )
}
