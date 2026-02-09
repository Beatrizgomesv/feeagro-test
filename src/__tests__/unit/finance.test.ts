import {
    calculateBalance,
    calculateTotals,
    buildBalanceSeries,
  } from '@/lib/finance'
  import { Transaction } from '@/mocks/transaction'
  
  describe('finance utils', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'IN',
        amount: 1000,
        date: '2024-01-01',
        description: 'Entrada',
        status: 'COMPLETED',
      },
      {
        id: '2',
        type: 'OUT',
        amount: 300,
        date: '2024-01-02',
        description: 'Saída',
        status: 'COMPLETED',
      },
      {
        id: '3',
        type: 'IN',
        amount: 500,
        date: '2024-01-03',
        description: 'Entrada',
        status: 'COMPLETED',
      },
    ]
  
    it('calculates balance correctly', () => {
      const balance = calculateBalance(1000, transactions)
      expect(balance).toBe(2200)
    })
  
    it('calculates totals correctly', () => {
      const { totalIn, totalOut } = calculateTotals(transactions)
      expect(totalIn).toBe(1500)
      expect(totalOut).toBe(300)
    })
  
    it('builds balance series correctly', () => {
      const series = buildBalanceSeries(1000, transactions)
      expect(series).toEqual([1000, 2000, 1700, 2200])
    })
  })
  