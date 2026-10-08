// PlaceholderDialog — modal that acknowledges a prototype interaction.
// Frontend-only feedback; no real functionality behind it.
//
import { useEffect, useRef, type ReactNode } from 'react'
import { CloseIcon } from './Icons'

interface PlaceholderDialogProps {
  title: string
  description: string
  onClose: () => void
  children?: ReactNode
}

export default function PlaceholderDialog({
  title,
  description,
  onClose,
  children,
}: PlaceholderDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="placeholder-dialog-title"
        className="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="placeholder-dialog-title"
            className="text-lg font-semibold tracking-tight text-neutral-900"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 flex-none place-items-center rounded-lg text-neutral-500 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">{description}</p>
        {children ?? (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
