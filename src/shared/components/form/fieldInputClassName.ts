export const fieldInputClassName =
  'w-full rounded-lg border border-solid border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-accent focus:border-solid focus:outline-none focus:ring-2 focus:ring-accent/20'

export function fieldInputClassNameWithError(hasError: boolean): string {
  if (!hasError) return fieldInputClassName
  return `${fieldInputClassName} border-red-500 focus:border-red-500 focus:ring-red-500/20`
}
