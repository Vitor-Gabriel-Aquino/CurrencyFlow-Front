type FieldErrorProps = {
  id?: string
  message?: string
}

export function FieldError({ id, message }: FieldErrorProps) {
  return (
    <p
      aria-live="polite"
      className="min-h-10 text-sm font-medium leading-5 text-[#b42318]"
      id={id}
    >
      {message ?? ''}
    </p>
  )
}
