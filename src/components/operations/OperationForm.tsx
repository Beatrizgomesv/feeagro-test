'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useTransactions } from '@/contexts/TransactionsContext'
import { useToast } from '@/contexts/ToastContext'
import ConfirmModal from '@/components/ui/ConfirmModal'

const operationSchema = z.object({
  type: z.enum(['IN', 'OUT']),
  beneficiary: z.string().min(3, 'Informe o beneficiário'),
  amount: z
    .coerce
    .number()
    .refine((value) => !Number.isNaN(value), {
      message: 'Informe um valor',
    })
    .positive('Valor deve ser maior que zero'),
  memo: z.string().optional(),
})

type OperationFormData = z.infer<typeof operationSchema>
type Step = 'form' | 'summary' | 'success'

export default function OperationForm() {
  const [step, setStep] = useState<Step>('form')
  const [summaryData, setSummaryData] =
    useState<OperationFormData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] =
    useState(false)

  const { addTransaction } = useTransactions()
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(operationSchema),
    defaultValues: {
      type: 'OUT',
      beneficiary: '',
      amount: undefined,
      memo: '',
    },
  })

  function onSubmit(data: OperationFormData) {
    setSummaryData(data)
    setStep('summary')
  }

  function handleConfirm() {
    if (!summaryData) return

    setLoading(true)

    setTimeout(() => {
      addTransaction({
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
        description: summaryData.memo || 'Nova operação',
        type: summaryData.type,
        amount: summaryData.amount,
        status: 'COMPLETED',
      })

      showToast('Operação realizada com sucesso')
      setLoading(false)
      setStep('success')
      reset()
    }, 1200)
  }

  if (step === 'summary' && summaryData) {
    return (
      <section className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Resumo da Operação
          </h2>

          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Tipo:</strong>{' '}
              {summaryData.type === 'IN'
                ? 'Entrada'
                : 'Saída'}
            </p>

            <p>
              <strong>Beneficiário:</strong>{' '}
              {summaryData.beneficiary}
            </p>

            <p>
              <strong>Valor:</strong>{' '}
              <span
                className={`font-medium ${
                  summaryData.type === 'IN'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                R$ {summaryData.amount}
              </span>
            </p>

            {summaryData.memo && (
              <p>
                <strong>Descrição:</strong>{' '}
                {summaryData.memo}
              </p>
            )}
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={loading}
            className="
              bg-green-600 hover:bg-green-700 transition
              text-white font-medium
              px-4 py-2 rounded-lg w-full
              disabled:opacity-50
            "
          >
            {loading ? 'Processando...' : 'Confirmar'}
          </button>
        </div>

        <ConfirmModal
          open={showConfirmModal}
          title="Confirmar operação"
          description="Tem certeza que deseja confirmar esta operação?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false)
            handleConfirm()
          }}
        />
      </section>
    )
  }

  if (step === 'success') {
    return (
      <section className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border shadow-sm p-6 text-center space-y-4">
          <h2 className="text-lg font-semibold text-green-700">
            Operação realizada com sucesso 🎉
          </h2>

          <p className="text-sm text-gray-600">
            Esta foi uma simulação. Nenhuma transação real
            foi feita.
          </p>

          <button
            onClick={() => setStep('form')}
            className="
              bg-green-600 hover:bg-green-700 transition
              text-white font-medium
              px-4 py-2 rounded-lg w-full
            "
          >
            Nova operação
          </button>
        </div>
      </section>
    )
  }


  return (
    <section className="max-w-md mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl border shadow-sm p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de operação
          </label>

          <select
            {...register('type')}
            className="
              mt-1 w-full rounded-lg border
              px-3 py-2 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          >
            <option value="OUT">Saída</option>
            <option value="IN">Entrada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Beneficiário
          </label>

          <input
            {...register('beneficiary')}
            className="
              mt-1 w-full rounded-lg border
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />

          {errors.beneficiary && (
            <p className="mt-1 text-xs text-red-600">
              {errors.beneficiary.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Valor
          </label>

          <input
            type="number"
            step="0.01"
            {...register('amount')}
            className="
              mt-1 w-full rounded-lg border
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />

          {errors.amount && (
            <p className="mt-1 text-xs text-red-600">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>

          <input
            {...register('memo')}
            className="
              mt-1 w-full rounded-lg border
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />
        </div>

        <button
          type="submit"
          className="
            bg-green-600 hover:bg-green-700 transition
            text-white font-medium
            px-4 py-2 rounded-lg w-full
          "
        >
          Continuar
        </button>
      </form>
    </section>
  )
}
