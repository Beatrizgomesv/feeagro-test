type Props = {
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    onCancel: () => void
  }
  
  export default function ConfirmModal({
    open,
    title,
    description,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    onConfirm,
    onCancel,
  }: Props) {
    if (!open) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
          <h2 className="text-lg font-semibold mb-2">
            {title}
          </h2>
  
          <p className="text-sm text-gray-600 mb-6">
            {description}
          </p>
  
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm border rounded"
            >
              {cancelLabel}
            </button>
  
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    )
  }
  