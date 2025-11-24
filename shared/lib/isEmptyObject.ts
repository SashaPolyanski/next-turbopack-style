export function isEmptyObject<T extends Record<string, unknown>>(
  obj: T,
): boolean {
  return Object.keys(obj).length === 0;
}
