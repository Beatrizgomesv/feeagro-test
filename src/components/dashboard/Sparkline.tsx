import { motion } from 'framer-motion'

type Props = {
  data: number[]
}

export default function Sparkline({ data }: Props) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)

  const isPositive = data[data.length - 1] >= data[0]

  const strokeColor = isPositive
    ? '#16a34a' // green-600
    : '#dc2626' // red-600

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / (max - min || 1)) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 100 100" className="w-full h-32" preserveAspectRatio="none">
      <motion.polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </svg>
  )
}
