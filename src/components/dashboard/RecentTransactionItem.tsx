import { Transaction } from '@/mocks/transaction'

type Props = {
  transaction: Transaction
}

export default function RecentTransactionItem({
  transaction,
}: Props) {
  const isIn = transaction.type === 'IN'

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium">
          {transaction.description}
        </p>
        <p className="text-xs text-gray-500">
          {transaction.date}
        </p>
      </div>

      <p
        className={`text-sm font-medium ${
          isIn ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isIn ? '+' : '-'} R$ {transaction.amount}
      </p>
    </div>
  )
}
