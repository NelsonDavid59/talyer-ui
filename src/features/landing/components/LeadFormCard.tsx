import type { SubmitEvent } from 'react'
import { CheckCircleIcon } from '@/shared/components/icons'

const fieldClasses =
  'w-full rounded-lg border border-dashed border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-accent focus:border-solid focus:outline-none focus:ring-2 focus:ring-accent/20'

export function LeadFormCard() {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-navy/5 sm:p-6"
      aria-labelledby="lead-form-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="lead-form-title" className="text-base font-bold text-navy">
            ¿Quieres TalyerApp para tu taller?
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">Déjanos tus datos y conversemos sobre tu cuenta.</p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-surface text-navy">
          <CheckCircleIcon className="size-4" />
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Nombre / empresa</span>
          <input name="name" type="text" placeholder="Nombre / empresa" className={fieldClasses} />
        </label>
        <label className="block">
          <span className="sr-only">Correo de contacto</span>
          <input name="email" type="email" placeholder="Correo de contacto" className={fieldClasses} />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">Cuéntanos sobre tu taller</span>
          <textarea
            name="message"
            rows={2}
            placeholder="Cuéntanos sobre tu taller"
            className={`${fieldClasses} resize-none`}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] text-slate-400">Espacio editable para tu formulario</p>
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-navy/20 transition hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Solicitar información
        </button>
      </div>
    </form>
  )
}
