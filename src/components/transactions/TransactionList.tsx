'use client'

import { Transaction } from '@/mocks/transaction'
import { motion } from 'framer-motion'

type Props = {
  transactions: Transaction[]
}

export default function TransactionList({ transactions }: Props) {
  if (!transactions.length) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-8 text-center">
        <p className="text-sm text-gray-600">
          Nenhuma transação encontrada
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Ajuste os filtros ou crie uma nova operação
        </p>
      </div>
    )
  }

  return (
    <motion.div
      key={transactions.length} 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 },
        },
      }}
      className="bg-white rounded-xl border shadow-sm divide-y"
    >
      {transactions.map((transaction) => {
        const isIn = transaction.type === 'IN'

        return (
          <motion.div
            key={transaction.id}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-500">
                {transaction.date}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`
                  text-xs px-2 py-1 rounded-full
                  ${
                    transaction.status === 'COMPLETED'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }
                `}
              >
                {transaction.status === 'COMPLETED'
                  ? 'Concluída'
                  : transaction.status}
              </span>

              <span
                className={`text-sm font-semibold ${
                  isIn ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isIn ? '+' : '-'} R$ {transaction.amount}
              </span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
