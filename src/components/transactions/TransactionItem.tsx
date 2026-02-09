import { Transaction } from '@/mocks/transaction'

type Props = {
  transaction: Transaction
}
    
export default function TransactionItem({ transaction }: Props) {
  const isIn = transaction.type === 'IN'

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition">

      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          {transaction.description}
        </span>
        <span className="text-xs text-gray-500">
          {transaction.date}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="
            text-xs px-2 py-1 rounded-full
            bg-gray-100 text-gray-600
          "
        >
          {transaction.status}
        </span>

        <span
          className={`text-sm font-semibold ${
            isIn ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isIn ? '+' : '-'} R$ {transaction.amount}
        </span>
      </div>
    </div>
  )
}
