type Props = {
    totalIn: number
    totalOut: number
  }
  
  export default function PeriodSummary({
    totalIn,
    totalOut,
  }: Props) {
    const net = totalIn - totalOut
    const positive = net >= 0
  
    return (
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <p className="text-sm text-gray-500">
          Resultado do período
        </p>
  
        <p
          className={`mt-2 text-2xl font-semibold ${
            positive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {positive ? '+' : '-'} R$ {Math.abs(net).toLocaleString()}
        </p>
  
        <p className="text-xs text-gray-400 mt-1">
          {positive
            ? 'Saldo positivo no período'
            : 'Saldo negativo no período'}
        </p>
      </div>
    )
  }
  