export const filterKeys = (
  values: any,
  keys: string[],
  mode: 'include' | 'exclude' = 'include'
): { [key: string]: any } => {
  return Object.keys(values)
    .filter((key: string) =>
      mode === 'include' ? keys.includes(key) : !keys.includes(key)
    )
    .reduce(
      (total: object, key: string) => ({ ...total, [key]: values[key] }),
      {}
    )
}

export const migrateKeys = (
  values: any,
  migration: any
): { [key: string]: any } => {
  return Object.keys(values).reduce(
    (total: object, key: string) => ({
      ...total,
      [migration[key] ?? key]: values[key]
    }),
    {}
  )
}
