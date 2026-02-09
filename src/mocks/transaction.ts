export type Transaction = {
    id: string
    date: string
    description: string
    type: 'IN' | 'OUT'
    amount: number
    status: 'COMPLETED' | 'PENDING' 
}
  
  export const transactionsMock: Transaction[] = [
    {
      id: '1',
      date: '2026-02-01',
      description: 'PIX Recebido',
      type: 'IN',
      amount: 1200,
      status: 'COMPLETED',
    },
    {
      id: '2',
      date: '2026-02-02',
      description: 'Transferência',
      type: 'OUT',
      amount: 300,
      status: 'PENDING',
    },
  ]
  