import { Transaction } from '@/mocks/transaction'

export function calculateBalance(
  initialBalance: number,
  transactions: Transaction[]
) {
  return transactions.reduce((balance, t) => {
    return t.type === 'IN'
      ? balance + t.amount
      : balance - t.amount
  }, initialBalance)
}

export function calculateTotals(
  transactions: Transaction[]
) {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === 'IN') {
        acc.totalIn += t.amount
      } else {
        acc.totalOut += t.amount
      }
      return acc
    },
    {
      totalIn: 0,
      totalOut: 0,
    }
  )
}

export function buildBalanceSeries(
    initialBalance: number,
    transactions: Transaction[]
  ) {
    let balance = initialBalance
  
    return transactions
      .slice()
      .reverse()
      .map((t) => {
        balance =
          t.type === 'IN'
            ? balance + t.amount
            : balance - t.amount
        return balance
      })
  }
  
