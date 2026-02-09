export default function TransactionSkeleton() {
    return (
      <div className="flex items-center justify-between p-4 animate-pulse">
  
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
  
     
        <div className="flex items-center gap-4">
          <div className="h-5 w-20 bg-gray-100 rounded-full" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }
  