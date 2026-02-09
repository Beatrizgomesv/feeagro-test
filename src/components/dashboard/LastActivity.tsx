import { Transaction } from '@/mocks/transaction'

type Props = {
  transaction?: Transaction
}

export default function LastActivity({ transaction }: Props) {
  if (!transaction) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
          Última atividade
        </p>

        <p className="text-sm text-gray-500">
          Nenhuma atividade recente
        </p>
      </div>
    )
  }

  const isIn = transaction.type === 'IN'

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Última atividade
      </p>

      <p className="text-sm text-gray-700">
        {transaction.description}
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          isIn ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isIn ? '+' : '-'} R$ {transaction.amount}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {transaction.date}
      </p>
    </div>
  )
}
