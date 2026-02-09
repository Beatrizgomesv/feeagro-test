import { motion } from 'framer-motion'

type Props = {
  title: string
  value: string
  accent?: 'green' | 'red' | 'neutral'
}

const accentClasses = {
  green: 'text-green-600',
  red: 'text-red-600',
  neutral: 'text-gray-800',
}

export default function SummaryCard({
  title,
  value,
  accent = 'neutral',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-xl border shadow-sm p-4"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-1 text-2xl font-semibold ${accentClasses[accent]}`}>
        {value}
      </p>
    </motion.div>
  )
}
