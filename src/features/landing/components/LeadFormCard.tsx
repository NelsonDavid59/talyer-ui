import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { EmailField } from '@/shared/components/form/EmailField'
import { TextField } from '@/shared/components/form/TextField'
import { CheckCircleIcon } from '@/shared/components/icons'
import { createLeadFormResolver } from '../model/leadFormResolver'
import { createLeadFormSchema, type LeadFormValues } from '../model/leadFormSchema'

export function LeadFormCard() {
  const { t } = useTranslation('forms')
  const schema = useMemo(() => createLeadFormSchema(t), [t])
  const resolver = useMemo(() => createLeadFormResolver(schema), [schema])
  const { control, handleSubmit } = useForm<LeadFormValues>({
    resolver,
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit(() => {
        // API de leads pendiente
      })}
      className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-navy/5 sm:p-6"
      aria-labelledby="lead-form-title"
      noValidate
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="lead-form-title" className="text-base font-bold text-navy">
            ¿Quieres TalyerApp para tu taller?
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">Solicita una demostración o prueba gratuita</p>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-surface text-navy">
          <CheckCircleIcon className="size-4" />
        </span>
      </div>

      <div className="mt-5 gap-3 flex flex-col">
        <TextField label={t('lead.fields.firstName')} name="firstName" control={control} maxLength={80} />
        <TextField label={t('lead.fields.lastName')} name="lastName" control={control} maxLength={80} />
        <TextField label={t('lead.fields.companyName')} name="companyName" control={control} maxLength={120} />
        <EmailField label={t('lead.fields.email')} name="email" control={control} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-navy/20 transition hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t('lead.actions.submit')}
        </button>
      </div>
    </form>
  )
}
