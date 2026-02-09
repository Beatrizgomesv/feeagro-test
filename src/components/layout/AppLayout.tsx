import Sidebar from './Sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="flex-1 bg-gray-50 px-8 py-6">
        {children}
      </main>
    </div>
  )
}
