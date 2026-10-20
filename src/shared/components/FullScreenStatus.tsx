import type { ReactNode } from 'react'

type FullScreenStatusProps = {
  title: string
  description?: ReactNode
  loading?: boolean
  actions?: ReactNode
}

export function FullScreenStatus({ title, description, loading, actions }: FullScreenStatusProps) {
  return (
    <main className="flex min-h-svh items-center justify-center bg-surface p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        {loading && (
          <div
            className="mx-auto mb-5 size-9 animate-spin rounded-full border-4 border-slate-200 border-t-navy"
            aria-hidden="true"
          />
        )}
        <h1 className="text-lg font-bold text-navy">{title}</h1>
        {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
        {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
      </div>
    </main>
  )
}
