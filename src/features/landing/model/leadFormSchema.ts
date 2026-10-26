import type { TFunction } from 'i18next'
import { z } from 'zod'

export type LeadFormValues = {
  firstName: string
  lastName: string
  companyName: string
  email: string
}

export function createLeadFormSchema(t: TFunction<'forms'>) {
  const message = (field: string, rule: string, options?: { max: number }) =>
    t(`lead.validationMessages.${field}.${rule}`, { ns: 'forms', ...options })

  return z.object({
    firstName: z
      .string()
      .min(1, message('firstName', 'required'))
      .max(80, message('firstName', 'maxLength', { max: 80 })),
    lastName: z
      .string()
      .min(1, message('lastName', 'required'))
      .max(80, message('lastName', 'maxLength', { max: 80 })),
    companyName: z
      .string()
      .min(1, message('companyName', 'required'))
      .max(120, message('companyName', 'maxLength', { max: 120 })),
    email: z.email({ error: message('email', 'invalid') }),
  })
}
