import { toNestErrors } from '@hookform/resolvers'
import type { FieldErrors, Resolver } from 'react-hook-form'
import type { z } from 'zod'
import type { LeadFormValues } from './leadFormSchema'

export function createLeadFormResolver(schema: z.ZodType<LeadFormValues>): Resolver<LeadFormValues> {
  return async (values, _context, options) => {
    const result = schema.safeParse(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    const flat: FieldErrors<LeadFormValues> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      if (!flat[path as keyof LeadFormValues]) {
        flat[path as keyof LeadFormValues] = {
          type: issue.code,
          message: issue.message,
        }
      }
    }

    return {
      values: {},
      errors: toNestErrors(flat, options),
    }
  }
}
