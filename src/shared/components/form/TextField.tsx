import { useId } from 'react'
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form'
import { FieldErrorMessage } from './FieldErrorMessage'
import { fieldInputClassNameWithError } from './fieldInputClassName'

type TextFieldProps<TFieldValues extends FieldValues> = {
  label: string
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  maxLength?: number
  className?: string
}

export function TextField<TFieldValues extends FieldValues>({
  label,
  name,
  control,
  maxLength,
  className = '',
}: TextFieldProps<TFieldValues>) {
  const { field, fieldState } = useController({ name, control })
  const error = fieldState.error?.message
  const errorId = useId()
  const hasError = Boolean(error)

  return (
    <label className={`block ${className}`.trim()}>
      <span className="sr-only">{label}</span>
      <input
        {...field}
        type="text"
        placeholder={label}
        maxLength={maxLength}
        className={fieldInputClassNameWithError(hasError)}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
      />
      <FieldErrorMessage id={errorId} message={error} />
    </label>
  )
}
