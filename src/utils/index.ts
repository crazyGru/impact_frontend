export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function toLocaleStr(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
