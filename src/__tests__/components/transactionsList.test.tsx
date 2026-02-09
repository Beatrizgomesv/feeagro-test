import { render, screen, act } from '@testing-library/react'
import TransactionList from '@/components/transactions/TransactionList'

jest.useFakeTimers()

describe('TransactionList component', () => {
  it('renders empty state', () => {
    render(<TransactionList transactions={[]} />)

    act(() => {
      jest.runAllTimers()
    })

    expect(
      screen.getByText(
        /você ainda não realizou nenhuma transação/i
      )
    ).toBeInTheDocument()
  })

  it('renders a transaction item', () => {
    render(
      <TransactionList
        transactions={[
          {
            id: '1',
            description: 'Teste',
            date: '2024-01-01',
            type: 'IN',
            amount: 100,
            status: 'COMPLETED',
          },
        ]}
      />
    )

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByText('Teste')).toBeInTheDocument()
    expect(screen.getByText('+ R$ 100')).toBeInTheDocument()
  })
})
