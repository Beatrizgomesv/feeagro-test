'use client'

import Link from 'next/link'
import { useTransactions } from '@/contexts/TransactionsContext'
import { useUser } from '@/contexts/UserContext'

import SummaryCard from '@/components/dashboard/SummaryCard'
import Sparkline from '@/components/dashboard/Sparkline'
import PeriodSummary from '@/components/dashboard/PeriodSummary'
import LastActivity from '@/components/dashboard/LastActivity'

import {
  calculateBalance,
  calculateTotals,
  buildBalanceSeries,
} from '@/lib/finance'

export default function DashboardPage() {
  const { transactions } = useTransactions()
  const user = useUser()

  const balance = calculateBalance(
    user.initialBalance,
    transactions
  )

  const { totalIn, totalOut } = calculateTotals(
    transactions
  )

  const series = buildBalanceSeries(
    user.initialBalance,
    transactions
  )

  const rwaPortfolio = [
    {
      id: 'soja',
      name: 'Soja',
      unit: '120 sacas',
      value: 18000,
      variation: 4.2,
    },
    {
      id: 'milho',
      name: 'Milho',
      unit: '90 sacas',
      value: 12500,
      variation: -1.3,
    },
  ]

  return (
    <section className="px-8 py-4 space-y-14">
  
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-8">
        <p className="text-sm opacity-90">
          Olá, {user.name.split(' ')[0]} 👋
        </p>

        <h2 className="text-2xl font-semibold mt-1">
          Seu saldo atual é de R$ {balance.toLocaleString()}
        </h2>

        <p className="text-sm opacity-90 mt-2">
          Acompanhe suas movimentações financeiras em tempo real
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Visão geral da sua conta
          </p>
        </div>

        <Link
          href="/new-operation"
          className="bg-green-600 hover:bg-green-700 transition text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          + Nova operação
        </Link>
      </div>


      <div>
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
          Resumo financeiro
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SummaryCard
            title="Entradas"
            value={`+ R$ ${totalIn.toLocaleString()}`}
            accent="green"
          />

          <SummaryCard
            title="Saídas"
            value={`- R$ ${totalOut.toLocaleString()}`}
            accent="red"
          />

          <SummaryCard
            title="Transações"
            value={transactions.length.toString()}
            accent="neutral"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          {series.length > 1 && (
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Evolução do saldo
                </h3>
                <span className="text-xs text-gray-400">
                  Últimos dias
                </span>
              </div>

              <Sparkline data={series} />
            </div>
          )}

          <div>
            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
              Este período
            </h3>

            <PeriodSummary
              totalIn={totalIn}
              totalOut={totalOut}
            />
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
              Portfólio RWA · Agro
            </h3>

            <div className="bg-white rounded-2xl border shadow-sm divide-y">
              {rwaPortfolio.map((asset) => {
                const positive = asset.variation >= 0

                return (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        🌾 {asset.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {asset.unit}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        R$ {asset.value.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          positive
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {positive ? '+' : ''}
                        {asset.variation}%
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
              Atividade recente
            </h3>

            <LastActivity transaction={transactions[0]} />
          </div>
        </div>
      </div>
    </section>
  )
}
