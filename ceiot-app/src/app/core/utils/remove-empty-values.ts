export function removeEmptyValues<T>(object: T): T {
  return Object.fromEntries(
    Object.entries(object as Object).filter(
      ([_, v]) => v !== null && v !== '' && v !== undefined
    )
  ) as T;
}
