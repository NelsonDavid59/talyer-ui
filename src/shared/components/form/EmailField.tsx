import { useId } from 'react'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import { FieldErrorMessage } from './FieldErrorMessage'
import { fieldInputClassNameWithError } from './fieldInputClassName'

type EmailFieldProps<TFieldValues extends FieldValues> = {
  label: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  className?: string
}

export function EmailField<TFieldValues extends FieldValues>({
  label,
  name,
  control,
  className = '',
}: EmailFieldProps<TFieldValues>) {
  const { field, fieldState } = useController({ name, control })
  const error = fieldState.error?.message
  const errorId = useId()
  const hasError = Boolean(error)

  return (
    <label className={`block ${className}`.trim()}>
      <span className="sr-only">{label}</span>
      <input
        {...field}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={label}
        className={fieldInputClassNameWithError(hasError)}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
      />
      <FieldErrorMessage id={errorId} message={error} />
    </label>
  )
}
